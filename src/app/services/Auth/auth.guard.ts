import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SIGNIN } from 'src/app/components/Utils/constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuard implements CanActivate {
  isAuthenticated:any=true;
    constructor(
        private authService: AuthService,
        private router: Router) {

        }



    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {

          const isAuthenticated=this.authService.isLoggedIn();


           if(isAuthenticated){
            console.log("IS AUTHENTICATED ",isAuthenticated)
            return true;
          }else{
            console.log("NO")
            this.router.navigateByUrl(SIGNIN)
          }
            return true;

    }
}
