import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Servicerequest } from 'src/app/interfaces/Servicerequest';
import { Service } from 'src/app/interfaces/Service';
import { ServiceService } from 'src/app/services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  servicess: Service[] = [];
  checked:boolean=false
  serviceselect:any=null
  @ViewChild('form') form: NgForm;
  serviceform:FormGroup;
  servicerequest:Servicerequest
  errormessage: any=null;
  images:Array<any>=[]
  imagess:Array<any>=[]
  dbservices:Array<any>=[]
  bookings: Array<any>=[];

  constructor(private serviceservice:ServiceService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.serviceform=new FormGroup({
      description:new FormControl('',Validators.required),
      cost:new FormControl('',Validators.required),
      isonoffer:new FormControl('',Validators.required)
    })


    this.fetchavailableservices();
    this.fetchdbservices();
    this.fetchthebookings()

  }
  createservice(){
    this.servicerequest={
      description:this.serviceform.get('description').value,
      cost:this.serviceform.get('cost').value,
      isonoffer:this.checked,
    }
    this.serviceservice.createservice(this.servicerequest).subscribe((data)=>{
          console.log("THE DATA ",data)
          if(data.status==false){
           this.errormessage=data.message
           this.toastr.error(data.message)

          }else{
            this.toastr.success("SERVICE CREATED")

            this.fetchdbservices();
            this.fetchavailableservices()


          }
    })
  }
  fetchdbservices(){
    this.serviceservice.fetchavailableservices().subscribe((data)=>{
      if(data.length>0){
        this.dbservices=data;
      }
    })
  }
  fetchthebookings(){
    this.serviceservice.fetchbookings().subscribe((data)=>{
      console.log("THE bookings ",data)
      if(data.status){
        this.bookings=data?.servicesList;
      }
    })
  }
uploadservicefiles(event){
  if (event.target.files && event.target.files[0]) {
    var filesAmount = event.target.files.length;
    console.log("THE FILES ",event.target.files)
    this.imagess=event.target.files
    for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();

            reader.onload = (event:any) => {
              // console.log(event.target.result);
               this.images.push(event.target.result);
            }

            reader.readAsDataURL(event.target.files[i]);
    }
}
}
upload(){
  console.log("serviceselect ",this.serviceselect)
  if(this.serviceselect==null){
    alert("SELECT A SERVICE")
    return null;
  }

  const formdata=new FormData();
  for (let index = 0; index < this.imagess.length; index++) {
    const element = this.imagess[index];
    formdata.append("files",element)
  }
  this.serviceservice.uploadserviceimagess(formdata,this.serviceselect).subscribe((data)=>{
    console.log("THE SERVER IMAGES DATA ",data)
    if(data.body?.status){
      this.toastr.success("IMAGE UPLOADED SUCCESSFULLY")
    }else if(data.body?.status==false){
      this.toastr.error(data.message)

    }
  })
}
delete(service){
    this.serviceservice.deleteservice(service.id).subscribe((data)=>{
      if(data.status){
        this.toastr.success("service with service images  deleted")
        this.fetchdbservices();

      }else if(data.status===false){
        this.toastr.error(data.message)

      }
    })
}
  checkedd(e){
    this.checked=!this.checked
  }
  fetchavailableservices(){
    this.serviceservice.fetchavailableservices().subscribe((data)=>{
      console.log("available services ",data)
      if(data){
        this.servicess = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.servicess.push({value: element?.id,viewValue:element.description})

         }
      }
    })
  }

  updateisonoffer(serviceid:number){
    this.serviceservice.updateisonoffer(serviceid).subscribe((data)=>{
      console.log("DATATATA ",data)
       if(data.status){
        this.fetchdbservices();
       }else if(data.status===false){
        this.toastr.error(data.message)
       }
    })
  }


}
