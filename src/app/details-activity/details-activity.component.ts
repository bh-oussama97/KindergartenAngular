import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../models/activity';
import { Kindergarten } from '../models/kindergarten';
import { ActivitiyService } from '../services/activitiy.service';

@Component({
  selector: 'app-details-activity',
  templateUrl: './details-activity.component.html',
  styleUrls: ['./details-activity.component.css']
})
export class DetailsActivityComponent implements OnInit {

  id: number | undefined;

  activity: Activity = new Activity();
  name: string | undefined;
  phonenumber: number | undefined;

  constructor(private route: ActivatedRoute, private activityservice: ActivitiyService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.activityservice.getactivitybyid(this.id).subscribe(data => {
      this.activity = data;
      console.log(data.kinderGarten?.name);
      this.name = data.kinderGarten?.name;
      this.phonenumber = data.kinderGarten?.tel;
    },
      error => {
        console.log(error.error);
      });

  }

}
