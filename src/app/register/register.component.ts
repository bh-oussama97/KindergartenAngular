
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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


  constructor(public userservice : UserService,private _router : Router,private fb:FormBuilder) { }

    ngOnInit(): void {

      this.dataValidation();
    
    }


    dataValidation()
    {
      this.userservice.formData = this.fb.group({

        id: null,
        firstName : ['',[Validators.required,Validators.minLength(6)]],
        lastName : ['',[Validators.required,Validators.minLength(6)]],
        email : ['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        address : ['',[Validators.required] ],
        tel : ['',[Validators.required,Validators.pattern('[9|5|2][0-9]{7}')]],
        role : [''],
     
          password : ['',[Validators.required,Validators.minLength(6)]],
          cpassword : ['',[Validators.required,Validators.minLength(6)]],
      },{
        validator : this.ConfirmedValidator('password','cpassword')
      }
      );

    }


    ConfirmedValidator(controlName: string, matchingControlName: string){
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
          if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
              return;
          }
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ confirmedValidator: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
  }

  
  registerUser()
    {
     
      console.log("role selected is "+ this.userservice.formData.get('role')?.value);

        this.userservice.registerUser(this.userservice.formData?.value).subscribe(
          data=> {
            
            Swal.fire({  
              position: 'top-end',  
              icon: 'success',  
              title: 'registration successfully completed',  
              showConfirmButton: false,  
              timer: 1500  
            })  
               console.log("successfully registered");
          console.log(data);
            this._router.navigate(['/login']);
          },
          error=>{
            console.log(error.error);
            
            Swal.fire({  
              icon: 'error',  
              title: 'Oops...',  
              text: 'Something went wrong!'
            
            }) 
          }
        )
     


        }



      //   console.log("selected role is"+  this.selectedRole);

      // this.user.role = this.selectedRole;
     
      // this.userservice.registerUser(this.user).subscribe(
      //   data => {

      //     console.log("successfully registered");
      //     console.log(data);
       
      //     this._router.navigate(['/login']);
      //   },
      //   error => {
      //     console.log(error);
          
      //   }
      //     );
      

    }


