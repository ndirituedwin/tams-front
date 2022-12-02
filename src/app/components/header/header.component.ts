import { Component, OnInit } from '@angular/core';
import { mixinInitialized } from '@angular/material/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { BOOKINGS, ISLOGGEDINN, NAILOFTHEWEEK, PROFILE, ROLE_ADMIN, ROLE_SUPER_ADMIN, SERVICES, SERVICESONOFFER, SIGNIN, SIGNUP, USERSPAGE } from '../Utils/constants';
import { Refreshtokenpayload } from './Refreshtokenpayload';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  refreshtokenpayload:Refreshtokenpayload

  istheuserloggedinn: boolean=false
    isadmin:boolean=false
  currentuser: any=null;
  constructor(private router:Router,private localstorage:LocalStorageService,private authService:AuthService) {
  this.initialized()
  }
  initialized() {
    this.refreshtokenpayload={
      refreshToken:null
    }
  }

  ngOnInit(): void {
    this.istheuserloggedin()
    this.getcurrentuser()
  }

  istheuserloggedin() {
    const istheuserloggedin=this.localstorage.retrieve(ISLOGGEDINN)
    if (istheuserloggedin=='false') {
       this.istheuserloggedinn=false

    }else if(istheuserloggedin=='true'){
      this.istheuserloggedinn=true

    }

  }
  getcurrentuser(){
    this.authService.getcurrentuser().subscribe((data)=>{
      console.log("THE CURRENT USERUSER  ",data)

      if(data !==null){
        this.currentuser=data
        console.log("THE CURRENT USER  ",data)
        if(data.message===null){
          data?.roles?.map((data)=>{
            if(data.name===ROLE_ADMIN || data.name===ROLE_SUPER_ADMIN){
              this.isadmin=true
            }
          })

        }


      }
    })
  }

  servicess(){
    this.router.navigateByUrl(SERVICES)
  }
  bookingsss(){
    this.router.navigateByUrl(BOOKINGS)
  }
  nailoftheweek(){
    this.router.navigateByUrl(NAILOFTHEWEEK)
  }
  signinn(){
    this.router.navigateByUrl(SIGNIN)
  }
  signup(){
    this.router.navigateByUrl(SIGNUP)

  }
  viewusers(){
    this.router.navigateByUrl(USERSPAGE)
  }
  offerss(){
    this.router.navigateByUrl(SERVICESONOFFER)
  }
  profile(){
    this.router.navigateByUrl(PROFILE)
  }

  logout(){
    this.refreshtokenpayload.refreshToken=this.authService.getRefreshToken()
    this.authService.logout(this.refreshtokenpayload);

  }
}
