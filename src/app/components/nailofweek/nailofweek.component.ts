import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';
import { Nailofweekrequest } from './Nailofweekrequest';

@Component({
  selector: 'app-nailofweek',
  templateUrl: './nailofweek.component.html',
  styleUrls: ['./nailofweek.component.scss']
})
export class NailofweekComponent implements OnInit {
  selectedFile:any=null
  @ViewChild('form') form: NgForm;
  nailform:FormGroup;
  nailofweekreqquest:Nailofweekrequest
  error:any=null
  nailsoftheweek:Array<any>=[];


  constructor(private serviceservice:ServiceService,private toastr:ToastrService) {
    this.nailofweekreqquest={
      cost:null,
      description:null,
      file:null
    }

  }
  ngOnInit(): void {
    this.nailform=new FormGroup({
      description:new FormControl('',Validators.required),
      cost:new FormControl('',Validators.required),
      file:new FormControl('',Validators.required)
    })
    this.fetchnailsoftheweek()
  }
  fetchnailsoftheweek(){
    this.serviceservice.getnailsofheweek().subscribe((data)=>{
      if(data.status){
        this.nailsoftheweek=data.weekNailList
      }
    })
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.selectedFile = file;
    console.log("THE FILE",this.selectedFile,"Dddd",file)
    }
}
savenail(){
  this.nailofweekreqquest={
    description:this.nailform.get('description').value,
    cost:this.nailform.get('cost').value,
    file:this.selectedFile,
  }
  console.log("THE DATA ",this.nailofweekreqquest)
  const formData: FormData = new FormData();
  formData.append('file', this.nailofweekreqquest.file);
  formData.append('cost', this.nailofweekreqquest.cost);
  formData.append('description', this.nailofweekreqquest.description);
  console.log("form data ",formData)

   this.serviceservice.savenailofweek(formData).subscribe((data)=>{
    if(data.status){
       this.toastr.success("NAIL OF WEEK SAVED")
       this.fetchnailsoftheweek()
       this.nailform.reset()
    }else if(data.status===false){
      this.error=data.message
    }
   })
}
delete(nail:any){
  this.serviceservice.deletenailoftheweek(nail.id).subscribe((data)=>{
    if(data.status){
      this.fetchnailsoftheweek()
    }else if(data.status===false){
      this.error=data.message

    }
  })
}


}
