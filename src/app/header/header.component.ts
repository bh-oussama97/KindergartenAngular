import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

username!:any;
stateuser!:any;

role! : any;

  constructor(public loginService:UserService) { }


  getusernamevalue() {
    return sessionStorage.getItem('username');
   
 } 

 getstateuser() {
  return sessionStorage.getItem('stateuser');
 
} 


getRole()
{
 return sessionStorage.getItem('role');
}


  ngOnInit(): void {

    this.role = this.getRole();
    console.log("role user header component is"+ this.role);
    this.username = this.getusernamevalue();
    this.stateuser = this.getstateuser();
  }

}
