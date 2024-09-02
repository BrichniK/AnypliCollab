import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { UsersService } from 'src/app/services/users.service';
import { Activity } from 'src/app/models/activity';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  activities: Activity[] = [];
  loading: boolean = true;

  constructor(
    private activityService: ActivityService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.activityService.getAllAct().subscribe(
      (response) => {
        this.activities = response.data;
        this.loadUserNames(); // Load user names after getting activities
        this.loading = false;
      },
      (error) => {
        console.error('Error loading activities:', error);
        this.loading = false;
      }
    );
  }

  loadUserNames() {
    this.activities.forEach((activity) => {
      this.userService.getUserById(activity.userId).subscribe(
        (user: User) => {
          activity.user = user; // Attach the user object to the activity
        },
        (error) => {
          console.error(`Error loading user with ID ${activity.userId}:`, error);
        }
      );
    });
  }
}
