import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Userauthenticated } from '../models/userauthenticated';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8081/user/add";
  private baseUrl1 = "http://localhost:8081/user/authenticate";
  
  


  constructor(private httpClient : HttpClient) { }

   registerUser(user: User) :Observable<object>
  {
    return this.httpClient.post(`${this.baseURL}`,user);
  }

  findUserByEmail(email:string|undefined) : Observable<User>
{
  return  this.httpClient.get<User>("http://localhost:8081/user/findUserByEmail/" + email);
}


  LoginUser(user: User) :Observable<Userauthenticated>
  {

    return this.httpClient.post<Userauthenticated>(`${this.baseUrl1}`,user);

}

forgetPassword(email :string|undefined) :Observable<any>
{
  return this.httpClient.post<any>("http://localhost:8081/user/sendSecretKey/" + email,null);
}

changePassword(id:number|undefined,newpass:string|undefined,code:string|undefined):Observable<any>
{
  return this.httpClient.put<any>("http://localhost:8081/user/changepwd/"+id+"/"+newpass+"/"+code,null);

}
}
