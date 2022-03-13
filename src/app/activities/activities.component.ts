import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '../models/activity';
import { ActivitiyService } from '../services/activitiy.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {


activities : Activity[] = [];

  constructor(private activityservice : ActivitiyService,private _router:Router) { }

  ngOnInit(): void {

    this.getactivities();
  }


  detailsactivity(id:number|undefined)
  {
    this._router.navigate(['/detailsActivity',id]);
  }

  private getactivities()
  {
    this.activityservice.getallactivities().subscribe(
      data=> {
        this.activities = data;
      }
    )
  }


 
}
