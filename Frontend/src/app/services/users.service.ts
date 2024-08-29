import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8080/user'; 


  constructor(private http: HttpClient)  { }


  getTotalUsers(): Observable<number> {
    return this.http.get<{ totalUsers: number }>(`${this.apiUrl}/dashboard/total-users`)
      .pipe(map(response => response.totalUsers));
  }


  
}
