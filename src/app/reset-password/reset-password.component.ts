import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']

  
})
export class ResetPasswordComponent implements OnInit {

 
  emailReceived! : any;  

  userfindbyemail : User | undefined  ;

  codetopass!: string ; 
  passwordtopass!:string;
  confirmpasswordtopass!:string;

  constructor(private userservice: UserService,private _router : Router) { 

   
  }
  
  getValue() {
    return localStorage.getItem('emailtopass');
   
 } 
  ngOnInit(): void {
       this.emailReceived = this.getValue();


    this.userfindbyemail = new User();
    this.userservice.findUserByEmail(this.emailReceived).subscribe( data => {
      this.userfindbyemail = data;
      console.log("id of user found :"+ this.userfindbyemail.id);
    });

  }

  resetPassword()
  {
    this.userservice.changePassword(this.userfindbyemail?.id,this.passwordtopass,this.codetopass).subscribe(
      data=> {
        console.log(data);
        this._router.navigate(['/login']);
      },
      error =>
      {
        console.log(error.error);
      }
    )

  }

}

