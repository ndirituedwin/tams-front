import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<any>=[];

  constructor(private serviceservice:ServiceService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.fetchusers();
  }
  fetchusers() {
    this.serviceservice.fetchusers().subscribe((data)=>{
      console.log("DATA from servcer ",data)
      if(data.status){
        this.users=data.weekNailList
      }else if(data.status===false){
         this.toastr.error(data.message)
      }
    })
  }

}
