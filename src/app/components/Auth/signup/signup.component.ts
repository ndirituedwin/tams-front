import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { SIGNIN, SIGNUPERROR, SIGNUPSUCCESS } from '../../Utils/constants';
import { Signuprequest } from '../Signuprequest';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;
  @ViewChild('form') form: NgForm;
  signupForm:FormGroup;
  error: any=null;
  fillallfields: string=null;
  signuprequest:Signuprequest


  constructor(private route:Router,private authservice:AuthService,private toastr:ToastrService) {
    this.initialize()
  }

  ngOnInit(): void {
    this.signupForm=new FormGroup({
      name:new FormControl('',Validators.required),
      username:new FormControl('',Validators.required),
      mobile:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })

  }
  // VALIDATE ALL FIELDS
  checkemptyfields(){

    if (this.signuprequest.mobile==''|| this.signuprequest.password==''|| this.signuprequest.username=='') {
      this.fillallfields="All fields are required";
      return

    }else if (this.signuprequest.mobile==null|| this.signuprequest.password==null|| this.signuprequest.username==null) {
      this.fillallfields="All fields are required";
      return

    }else if (this.signuprequest.mobile==undefined|| this.signuprequest.password==undefined|| this.signuprequest.username==undefined) {
      this.fillallfields="All fields are required";
      return

    }else{
      this.fillallfields=null

        this.signupcall(this.signuprequest);
    }
  }
  // REGGISTER THE USER
  signupcall(signuprequest: Signuprequest) {

    this.authservice.signup(signuprequest).subscribe((data)=>{
      console.log("THE DB DATA ",data)
      if(data?.body.success){
        this.toastr.success(SIGNUPSUCCESS)
        this.error=data?.body
         setTimeout(() => {
          this.route.navigateByUrl(SIGNIN)
         }, 1000);
      }else if(data?.body.success==false){
        console.log("THE ERROR ", data)
        this.toastr.error(SIGNUPERROR)
        this.error=data?.body
      }

  })
  }
  signup(){
    this.signuprequest={
      name:this.signupForm.get('name').value,
      username:this.signupForm.get('username').value,
      mobile:this.signupForm.get('mobile').value,
      password:this.signupForm.get('password').value,
    }

    this.checkemptyfields();
  }
  login(){
    this.route.navigateByUrl(SIGNIN)

  }
  checkMobileLength(fieldName, event) {
    // console.log("event obj", event.target.value.length);
    if(event.target.value.length == 10) {
      // this.validateEmailMobRegno(fieldName,event);
    } else if(event.target.value.length > 10) {
      let mobno = event.target.value;
      let mobLen = (event.target.value.length)-1;
      event.target.value = mobno.substring(0,mobLen);
    }
  }

  initialize(){
    this.signuprequest={
      name:null,
      username:null,
      mobile:null,
      password:null
    }
    this.error=null
  }
}
