// src/app/services/activity.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Activity } from '../models/activity';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  
  private baseUrl = 'http://localhost:8080/activity';

  constructor(private http: HttpClient) {}

  getAllAct(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/show`);
  }
}
