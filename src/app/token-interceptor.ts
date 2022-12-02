import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { AuthService } from './services/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ACCESSTOKEN, FORBIDDEN, ISLOGGEDINN, SIGNIN, SIGNUP, UNAUTHORIZED } from './components/Utils/constants';
import { LoginResponse } from './components/Auth/login.response.payload';
const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})

// @Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private route:Router,public authService: AuthService,private toastr:ToastrService,private localstorage:LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {


        let accessToken=this.localstorage.retrieve(ACCESSTOKEN)
        if(accessToken !==null){
            const isthetokenexpired=jwtHelper.isTokenExpired(this.localstorage.retrieve(ACCESSTOKEN))

            // setTimeout(() => {

                if(isthetokenexpired){
                    this.route.navigateByUrl(SIGNIN)
                    this.toastr.error(UNAUTHORIZED)
                    this.localstorage.store(ISLOGGEDINN,'false')
                        this.authService.clearlocalstorage()

                }
            // }, 200);
        }



      if (req.url.indexOf(SIGNUP) !== -1 || req.url.indexOf(SIGNIN) !== -1) {
          return next.handle(req);
      }
      const jwtToken = this.authService.getJwtToken();

      return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
          if (error instanceof HttpErrorResponse
              && error.status === 403 || error.status ===401) {
                console.log("error un authorized")
                this.toastr.error(FORBIDDEN)

              return this.handleAuthErrors(req, next);
          } else {
              return throwError(error);
          }
      }));
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
      : Observable<HttpEvent<any>> {
      if (!this.isTokenRefreshing) {
          this.isTokenRefreshing = true;
          this.refreshTokenSubject.next(null);

          return this.authService.refreshToken().pipe(
              switchMap((refreshTokenResponse: LoginResponse) => {
                  this.isTokenRefreshing = false;
                  this.refreshTokenSubject
                      .next(refreshTokenResponse.accessToken);
                  return next.handle(this.addToken(req,
                      refreshTokenResponse.accessToken));
              })
          )
      } else {
          return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap((res) => {
                  return next.handle(this.addToken(req,
                      this.authService.getJwtToken()))
              })
          );
      }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
      return req.clone({
          headers: req.headers.set('Authorization',
              'Bearer ' + jwtToken)
      });
  }

}
