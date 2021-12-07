import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 
})
export class LoginComponent implements OnInit {


  user: User = new User();
  role = '';

  emailtopass!: string ; 


  stateuser!:string;

  message : boolean=false;

  constructor(private userservice: UserService,private _router : Router) { }

  ngOnInit(): void {
  }


  forgetPassword()
  {
    console.log('email to pass: '+this.emailtopass);
   

    this.userservice.forgetPassword(this.emailtopass).subscribe(
      data => {

        localStorage.setItem("emailtopass", this.emailtopass);
       
       
        console.log(data);
        this._router.navigate(['/resetPassword']);
      },
      error => {
        console.log(error.error); 
      }
    )
  }



  loginUser()
  {

  

    this.userservice.LoginUser(this.user).subscribe(
      data => {

        console.log("email of user"+this.user.email);
        console.log("role is "+this.role);
      
        this.role = data.authorities[0];
        this.stateuser  = data.state;
       
        console.log("username"+data.username);

       console.log(this.stateuser);
       

        if (this.role== "ROLE_parent" && this.stateuser == "active")
        {
          localStorage.setItem("username",data.username);
          localStorage.setItem("stateuser",this.stateuser);
          this._router.navigate(['/home']);

          this.message = false;
        }
       else if (this.role == "ROLE_parent" && this.stateuser =="waiting")
       {
        this.message = true;
       }
    
      //  console.log("response reveived");

      //   this._router.navigate(['/home']);
        
      },
      error => {
        console.log(error.error); 
      }
        );
      }

      removeMessage()
      {
        this.message = false;
      }
      
  }


