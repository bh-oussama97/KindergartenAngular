import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  loginForm!: FormGroup;

  constructor(private userservice: UserService,private _router : Router,private fb : FormBuilder) { }

  ngOnInit(): void {

    this.dataValidation();
  }




  dataValidation()
  {
    this.loginForm = this.fb.group({
      email : ['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password :['',[Validators.required,Validators.minLength(6)]]
    });
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
    this.userservice.LoginUser(this.loginForm.value).subscribe(
      data => {

        console.log("email of user"+this.user.email);
        console.log("role is "+this.role);
      
        this.role = data.authorities[0];
        this.stateuser  = data.state;
       
        console.log("username"+data.username);

       console.log(this.stateuser);
       

        if ( this.stateuser == "active")
        {
          sessionStorage.setItem("username",data.username);
          sessionStorage.setItem("stateuser",this.stateuser);
          sessionStorage.setItem("role",data.authorities[0]);
          this._router.navigate(['/home']);

          this.message = false;
        }
       else if ( this.stateuser =="waiting")
       {
        this.message = true;
       }
    
      //  console.log("response reveived");

      //   this._router.navigate(['/home']);
        
      },
      error => {
        console.log(error.error); 
        Swal.fire({  
          icon: 'error',  
          title: 'Try again',  
          text: 'Password or email is wrong !'
        
        }) 
      }
        );
      }

      removeMessage()
      {
        this.message = false;
      }
      
  }


