import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_URL } from '../components/Utils/constants';
import { Bookingrequest } from '../interfaces/Bookingrequest';
import { Saveattendantrequest } from '../interfaces/Saveattendantrequest';
import { Servicerequest } from '../interfaces/Servicerequest';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {















  createserviceurl=ROOT_URL+"/api/services/createservice/"
  uploadserviceimages=ROOT_URL+"/api/services/service-images-upload/"
  fetchavailableservicesurl=ROOT_URL+"/api/services/services-get/"
  updateisonofferr=ROOT_URL+"/api/services/service-update-isonoffer/"
  servicesgetwithimagesurl=ROOT_URL+"/api/services/services-get-with-images/"
  serviceimagegeturl=ROOT_URL+"/api/services/service-image-get/"
  bookserviceurl=ROOT_URL+"/api/booking/book-service"
  fetchattendantsurl=ROOT_URL+"/api/services/get-attendants/"
  saveattendanturl=ROOT_URL+"/api/services/save-attendant/"
  fetchdbookingsurl=ROOT_URL+"/api/booking/fetch-bookings"
  savenailofweekurl=ROOT_URL+"/api/nailofweek/add"
  getnailofweekurl=ROOT_URL+"/api/nailofweek/fetch"
  deletenailoftheweekurl=ROOT_URL+"/api/nailofweek/delete/"
  fetchallusersurl=ROOT_URL+"/api/auth/fetchallusersurl/"
  deleteserviceurl=ROOT_URL+"/api/services/delete-service/"

  constructor(private http:HttpClient) { }
  createservice(servicerequest: Servicerequest) :Observable<any> {
    return this.http.post<any>(this.createserviceurl,servicerequest);

  }
  deleteservice(id: any) {
    return this.http.post<any>(this.deleteserviceurl+id,null);

  }
  savenailofweek(formData: FormData) {
    return this.http.post<any>(this.savenailofweekurl,formData);

  }
  getnailsofheweek() {
    return this.http.get<any>(this.getnailofweekurl);
  }
  deletenailoftheweek(id: any) {
    return this.http.post<any>(this.deletenailoftheweekurl+id,null);

  }
  uploadserviceimagess(formdata: FormData,serviceid:number):Observable<any> {
    return this.http.post<any>(this.uploadserviceimages+serviceid,formdata);
  }
  fetchavailableservices() {
    return this.http.get<any>(this.fetchavailableservicesurl);
  }
  fetchbookings() {
    return this.http.get<any>(this.fetchdbookingsurl);
  }
  servicesgetwithimagesurll() {
    return this.http.get<any>(this.servicesgetwithimagesurl);
  }
  gettheserviceimage(serviceid: number) {
    return this.http.post<any>(this.serviceimagegeturl+serviceid,null);

  }
  bookservice(bookingrequest: Bookingrequest):Observable<any>  {
      return this.http.post<any>(this.bookserviceurl,bookingrequest);
  }
  saveattendant(saveattendantrequest: Saveattendantrequest) :Observable<any> {
    return this.http.post<any>(this.saveattendanturl,saveattendantrequest);

  }
  gettheattendants() {
    return this.http.get<any>(this.fetchattendantsurl);
  }
  updateisonoffer(serviceid: number) {
    return this.http.post<any>(this.updateisonofferr+serviceid,null);

  }
  fetchusers() {

    return this.http.get<any>(this.fetchallusersurl);

  }

}
