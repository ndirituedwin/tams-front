import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Loginrequest } from 'src/app/interfaces/Loginrequest';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { ACCESSTOKEN, EXPIRESAT, HOME, ISLOGGEDINN, REFRESHTOKEN, SIGNINERROR, SIGNINSUCCESS, SIGNUP, USERNAME } from '../../Utils/constants';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  @ViewChild('form') public form: NgForm;
  loginForm:FormGroup;
  signinfailed: any=null;
  fillallfields: string=null;
  hide = true;
  loginrequest:Loginrequest



  constructor(private route:Router,private toastr:ToastrService,private authservice:AuthService,private localstorage:LocalStorageService) {
    this.initialize()
   }
  initialize() {
    this.signinfailed=null
    this.fillallfields =null;
    this.loginrequest={
      mobile:null,
      password:null
    }
   }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      mobile:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
    });
  }

  login(){
    this.loginrequest={
      mobile:this.loginForm.get('mobile').value,
      password:this.loginForm.get('password').value
    }
    this.checkemptyfields();

  }
  checkemptyfields(){

    if (this.loginrequest.mobile==null|| this.loginrequest.password=='') {
      this.fillallfields="All fields are required";
      return

    }else if (this.loginrequest.password==null) {
      this.fillallfields="All fields are required";
      return

    }else if (this.loginrequest.mobile==undefined|| this.loginrequest.password==undefined) {
      this.fillallfields="All fields are required";
      return

    }else{
      this.fillallfields=null

      console.log("THE SIGN IN  REQUEST ",this.loginrequest)
        this.signinuser(this.loginrequest);
    }
  }
  signinuser(loginrequest: Loginrequest) {
    this.authservice.signin(loginrequest).subscribe((data)=>{
      console.log("SIGN IN DATA ",data)
      if(data.status){
        this.localstorage.store(ACCESSTOKEN,data.accessToken)
        this.localstorage.store(USERNAME,data.username)
        this.localstorage.store(REFRESHTOKEN,data.refreshToken)
        this.localstorage.store(EXPIRESAT,data.expirationTime)
        this.localstorage.store(ISLOGGEDINN,'true')
        this.toastr.success(SIGNINSUCCESS)
        setTimeout(() => {
          this.route.navigateByUrl(HOME)
        }, 1000);
      }else if(data.status==false){
        this.toastr.error(SIGNINERROR)
        this.signinfailed=data?.message
      }
    })
  }
  signup(){
    this.route.navigateByUrl(SIGNUP)
  }

}
