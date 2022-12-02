import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  profileform:FormGroup;
  currentuser:any=null
  bookings: Array<any>=null;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.profileform=new FormGroup({
      name:new FormControl('',Validators.required),
      username:new FormControl('',Validators.required),
      mobile:new FormControl('',Validators.required)
    })
    this.getcurrentuser()

  }
  getcurrentuser(){
    this.authService.getcurrentuser().subscribe((data)=>{
      console.log("THE CURRENT USERUSER  ",data)
      if(data !==null){
        console.log("THE CURRENT USER  ",data)
        if(data.message===null){
          this.currentuser=data
          this.profileform.controls['username'].setValue(this.currentuser.username)
          this.profileform.controls['mobile'].setValue(this.currentuser.mobilenumber)
          this.profileform.controls['name'].setValue(this.currentuser.name)
        }
        if(data.booking !==null){
          this.bookings=data.booking
        }
      }
    })
  }
  updateprofile(){


  }

}
