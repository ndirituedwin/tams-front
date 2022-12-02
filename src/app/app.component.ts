import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  template:'<h1>Count:{{count$| async}}</h1>'
  // templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'tamsbeautyfront';

   count$=of(NaN);
    constructor() {
    }

    ngOnInit(): void {
      alert(this.count$)
      console.log("THE COUNT ",this.count$)
    }
  }

