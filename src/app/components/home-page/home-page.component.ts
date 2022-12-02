import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ServiceService } from 'src/app/services/service.service';
import { BOOKINGS, ISLOGGEDINN, SERVICEDETAILSPAGE, SERVICES, SERVICESONOFFER, SIGNIN, USERSPAGE } from '../Utils/constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  servicesonoffer:Array<any>=[]
  nailsoftheweek:Array<any>=[]
  servicesonoffernot: Array<any>=[];

  constructor(private router:Router,private serviceservice:ServiceService) { }

  ngOnInit(): void {
    this.filterservicesonoffer();
    this.nailsoftheweekk();
  }
  filterservicesonoffer() {
    this.serviceservice.servicesgetwithimagesurll().subscribe((data)=>{
      console.log("ata ",data)
      if(data?.content.length>0){
        data.content.map((data)=>{
          if(data.serviceImageList.length>0){
            data.serviceImageList.map((data)=>{
              this.servicesonoffer.push(data)
              this.servicesonoffer=this.servicesonoffer.filter((data)=>data.service.isonoffer)
              const shuffled = [...this.servicesonoffer].sort(() => 0.5 - Math.random());

              this.servicesonoffer=shuffled.slice(0, 6);
            })

          }
        }
          )

      }
    })
  }

  filterservicesonoffernot() {
    this.serviceservice.servicesgetwithimagesurll().subscribe((data)=>{
      console.log("ata ",data)
      if(data?.content.length>0){
        data.content.map((data)=>{
          if(data.serviceImageList.length>0){
            data.serviceImageList.map((data)=>{
              this.servicesonoffernot.push(data)
              this.servicesonoffernot=this.servicesonoffernot.filter((data)=>data.service.isonoffer===false)
              const shuffled = [...this.servicesonoffernot].sort(() => 0.5 - Math.random());

              this.servicesonoffernot=shuffled.slice(0, 6);
            })

          }
        }
          )

      }
    })
  }
  viewdetails(input:any){
    console.log("VIEW THE DETAILS ",input)
    this.router.navigateByUrl('service-details/'+input.id)

  }
  nailsoftheweekk(){
   this.serviceservice.getnailsofheweek().subscribe((data)=>{
    if(data.status){
      this.nailsoftheweek=data.weekNailList
    }
   })
  }



}
