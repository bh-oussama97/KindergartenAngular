
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 

  user: User = new User();
  msg= '';

  roles = [
    {valuetosave:"ROLE_parent",id:1},
    {valuetosave: "ROLE_adminGarten"  , id:2},
    {valuetosave: "ROLE_visitor" ,  id:3},
    {valuetosave: "ROLE_doctor",  id:4},
    {valuetosave: "ROLE_agentCashier",  id:5},
    {valuetosave:"ROLE_provider", id:6}
 ];


 selectedRole ='';


  constructor(private userservice : UserService,private _router : Router) { }

    ngOnInit(): void {
    
    }

    registerUser()
    {
      console.log("selected role is"+  this.selectedRole);

      this.user.role = this.selectedRole;
     
      this.userservice.registerUser(this.user).subscribe(
        data => {

          console.log("successfully registered");
          console.log(data);
       
          this._router.navigate(['/login']);
        },
        error => {
          console.log(error);
          
        }
          );
        }
      

    }


