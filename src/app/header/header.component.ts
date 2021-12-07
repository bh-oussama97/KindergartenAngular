import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

username!:any;
stateuser!:any;

  constructor() { }


  getusernamevalue() {
    return localStorage.getItem('username');
   
 } 

 getstateuser() {
  return localStorage.getItem('stateuser');
 
} 


  ngOnInit(): void {

    this.username = this.getusernamevalue();
    this.stateuser = this.getstateuser();
  }

}
