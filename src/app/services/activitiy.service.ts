import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiyService {

  constructor(private httpClient : HttpClient) { }

  private baseadress = "http://localhost:8081/user/getAllactivities";
  private basedetailsaddress = "http://localhost:8081/user/getActivityById"


  getallactivities() : Observable<Activity[]>
  {
    return this.httpClient.get<Activity[]>(this.baseadress);
  }

  getactivitybyid(id:number|undefined) : Observable<Activity>
  {
    return this.httpClient.get<Activity>(`${this.basedetailsaddress}/${id}`);
  }




}
