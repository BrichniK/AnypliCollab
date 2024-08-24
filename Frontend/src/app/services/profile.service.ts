import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Observable  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient, private router: Router) {}

  addUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}ajouterUser`, user);
  }

  updateUser(user: User): Observable<User> {
      return this.http.put<User>(`${this.baseUrl}updateUser/${user.id}`, user);
  }

  profile (){
    this.router.navigateByUrl('/profile');

  }
  getAllusers(): Observable<any> {
      return this.http.get(this.baseUrl);
  }

  getCurrentUser(): Observable<any> {
      return this.http.get(`${this.baseUrl}current`);
  }

  removeUser(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}removeuser/${id}`);
  }

  blockUser(userId: number): Observable<User> {
      return this.http.put<User>(`${this.baseUrl}${userId}/block`, null);
  }

  unblockUser(userId: number): Observable<User> {
      return this.http.put<User>(`${this.baseUrl}${userId}/unblock`, null);
  }
}
