// src/app/services/activity.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: Activity[] = [
    { id: 1, userId: 1, description: 'User 1 added a new task.', date: new Date() },
    { id: 2, userId: 2, description: 'User 2 changed the task status.', date: new Date() }
  ];

  getActivities(): Observable<Activity[]> {
    return of(this.activities);
  }
}
