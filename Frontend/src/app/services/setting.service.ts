import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class settingService {
  private baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/show`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/adduser`, user);
}

removeUser(id: String): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
}

updateUser(user: User): Observable<User> {
  return this.http.put<User>(`${this.baseUrl}/update/${user.id}`, user);
}

}
