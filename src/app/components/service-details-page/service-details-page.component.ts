import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { Bookingrequest } from 'src/app/interfaces/Bookingrequest';
import { Service } from 'src/app/interfaces/Service';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import { ISLOGGEDINN, SIGNIN } from '../Utils/constants';

@Component({
  selector: 'app-service-details-page',
  templateUrl: './service-details-page.component.html',
  styleUrls: ['./service-details-page.component.scss']
})
export class ServiceDetailsPageComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  bookingform:FormGroup;
  serviceid:number
  attendantid:any=null
  serviceimage:any
  attendants: Service[] = [];
  bookingrequest:Bookingrequest
  fillallfields: string=null;
  error: any=null;
  istheuserloggedinn: boolean=false;


  constructor(private activatedRoute:ActivatedRoute,private service:ServiceService,private toastr:ToastrService,private localstorage:LocalStorageService,private authservice:AuthService,private route:Router) {

     this.initialize()
   }

  ngOnInit(): void {
      this.gettheserviceimage()
      this.getattendants()
      this.bookingform=new FormGroup({
        amountpaid:new FormControl('',Validators.required),
        amount:new FormControl(this.serviceimage?.serviceImage?.service.cost),
        mobileusedforpayment:new FormControl('',Validators.required),
        timeofpayment:new FormControl('',Validators.required),
        servicetime:new FormControl('',Validators.required)
      })
  }
  // check if the user is logged in
  istheuserloggedin(bc?:string) {
    const istheuserloggedin=this.localstorage.retrieve(ISLOGGEDINN)
    if (istheuserloggedin==='false') {
       this.istheuserloggedinn=false
       if(bc==="buttonclicked"){
          this.route.navigateByUrl(SIGNIN)
       }

    }else if(istheuserloggedin==='true'){
      this.istheuserloggedinn=true

    }

  }
  getattendants(){
    this.service.gettheattendants().subscribe((data)=>{
      console.log("GET THE ATTENDANTS ",data)
      if(data?.length>0){
        this.attendants = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.attendants.push({value: element?.id,viewValue:element.name+' '+element.mobile})

         }
      }
    })
  }
  gettheserviceimage(){
    this.service.gettheserviceimage(this.serviceid).subscribe((data)=>{
      console.log("datata ",data)
      if(data.status){
        this.serviceimage=data
      }
    })
  }
// booking a service
  bookservice(){
    this.istheuserloggedin("buttonclicked")

  }

  booktheservice(){
    this.bookingrequest={
      amountrequired: this.serviceimage?.serviceImage?.service.cost,
      amount:this.bookingform.get('amountpaid').value,
      mobile:this.bookingform.get('mobileusedforpayment').value,
      servicetime:this.bookingform.get('servicetime').value,
      timepaid:this.bookingform.get('timeofpayment').value,
      services_id:Number(this.serviceimage?.serviceImage?.service.id),
      attendant_id:this.attendantid
    }

    this.checkemptyfields();
  }
  checkemptyfields(){

    if (this.bookingrequest.amount==null|| this.bookingrequest.amountrequired==null|| this.bookingrequest.mobile==null|| this.bookingrequest.services_id==null|| this.bookingrequest.servicetime==null|| this.bookingrequest.attendant_id==null||  this.bookingrequest.timepaid==null) {
      this.fillallfields="All fields are required";
      return

     }else if (this.bookingrequest.amount==undefined|| this.bookingrequest.amountrequired==undefined|| this.bookingrequest.mobile==undefined|| this.bookingrequest.services_id==undefined|| this.bookingrequest.servicetime==undefined|| this.bookingrequest.timepaid==undefined|| this.bookingrequest.attendant_id==undefined) {
        this.fillallfields="All fields are required";
      return

     }else if (this.bookingrequest.mobile==''||  this.bookingrequest.servicetime+''==''||  this.bookingrequest.timepaid+''=='') {
        this.fillallfields="All fields are required";
      return

    }else{
      this.fillallfields=null

        this.nowbook(this.bookingrequest);
    }
  }
  nowbook(bookingrequest: Bookingrequest) {
    console.log("THE BOOKING REQUEST ",bookingrequest);
      if (this.bookingrequest.amount<this.bookingrequest.amountrequired){
        this.fillallfields="The amount is not enough"
        return null
      }
    this.service.bookservice(this.bookingrequest).subscribe((data)=>{
      console.log("dataat ",data)
      if(data.status){
        this.toastr.success("You have successfully booked the service ")
        this.error=data.message

      }else if(data.status==false){
        this.toastr.error("You have already booked the service ")

        this.error=data.message
      }
    })
  }
   initialize(){
    this.serviceid=null
    this.serviceimage=null
    this.serviceid=this.activatedRoute.snapshot.params['id']

    this.bookingrequest={
      amount:null,
      amountrequired:null,
      attendant_id:null,
      mobile:null,
      services_id:null,
      servicetime:null,
      timepaid:null
    }
   }
}
