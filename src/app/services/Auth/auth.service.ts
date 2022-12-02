import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from 'src/app/components/Auth/login.response.payload';
import { Signuprequest } from 'src/app/components/Auth/Signuprequest';
import { Refreshtokenpayload } from 'src/app/components/header/Refreshtokenpayload';
import { ACCESSTOKEN, EXPIRESAT, HOME, ISLOGGEDINN, REFRESHTOKEN, ROOT_URL, SIGNIN, USERNAME } from 'src/app/components/Utils/constants';
import { Loginrequest } from 'src/app/interfaces/Loginrequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  sgnupurl=ROOT_URL+"/api/auth/signup/"
  signinurl=ROOT_URL+"/api/auth/signin/"
  signouturl=ROOT_URL+"/api/auth/logout/"
  refreshTokenurl=ROOT_URL+"/api/auth/refreshToken"
  currentuserurl=ROOT_URL+"/api/auth/get-current-user"



  constructor(private http:HttpClient,private localstorage:LocalStorageService,private route:Router) { }




  signup(signuprequest: Signuprequest):Observable<any> {
    return this.http.post<any>(this.sgnupurl,signuprequest);
  }
  signin(loginrequest: Loginrequest) :Observable<any> {
    return this.http.post<any>(this.signinurl,loginrequest);
  }
  getcurrentuser() :Observable<any> {
    return this.http.post<any>(this.currentuserurl,null);
  }
  logout(refreshtokenpayload: Refreshtokenpayload) {
    this.http.post(this.signouturl,refreshtokenpayload).subscribe((data)=>{
        console.log("logout",data)
        this.localstorage.clear(ACCESSTOKEN)
        this.localstorage.clear(USERNAME)
        this.localstorage.clear(REFRESHTOKEN)
        this.localstorage.clear(EXPIRESAT)
        this.localstorage.store(ISLOGGEDINN,'false')
        this.route.navigateByUrl(HOME)

        return true;
    },error=>{
      throwError(error)
    })
  }
  getRefreshToken() {
    return this.localstorage.retrieve(REFRESHTOKEN);
  }
  getUsername() {
    return this.localstorage.retrieve(USERNAME);

  }
  isLoggedIn(): boolean {
    return this.getJwtToken() !=null
  }
  getJwtToken() {
    return this.localstorage.retrieve(ACCESSTOKEN)
    // return this.localstorage.retrieve('authenticationToken');
  }
  refreshToken() {
    const RefreshTokenPayload={
      refreshToken:this.getRefreshToken(),
      username:this.getUsername()
    }
    return this.http.post<LoginResponse>(this.refreshTokenurl,RefreshTokenPayload)
    .pipe(tap(response=>{
      this.localstorage.store(ACCESSTOKEN,response.accessToken);
        this.localstorage.store(EXPIRESAT,response.expirationTime)
    }));
  }
  clearlocalstorage(){
    this.localstorage.clear(ACCESSTOKEN)
    this.localstorage.clear(USERNAME)
    this.localstorage.clear(REFRESHTOKEN)
    this.localstorage.clear(EXPIRESAT)
    this.localstorage.store(ISLOGGEDINN,'false')
  }
}
