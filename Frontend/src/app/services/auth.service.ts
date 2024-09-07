import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);
  private isLoggedIn$ = this.authSubject.asObservable();
  endpoint: string = 'http://localhost:8080/auth/';

  constructor(private http: HttpClient, private router: Router) {}

  signin(data: any): Observable<any> {
    return this.http.post(this.endpoint + 'signin', data).pipe(
      tap((response: any) => {
        const token = response.token; // Access the correct token field
        if (token) {
          this.setToken(token); // Store the token
          console.log('Token stored:', token); // Log after storing

          this.updateLoggedInState(true);
        } else {
          console.log('Token not found in response'); // Log if token is not found
        }
        const role = response.role;
        console.log(role)
        this.setRole(role);
      })
    );
  }

  register(data: any) {
    return this.http.post(this.endpoint + 'signup', data);
  }

  logout() {
    window.localStorage.clear();
    this.updateLoggedInState(false);
    this.router.navigate(['/login']); // Redirect to login after logout
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  public getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token); 
    return token;
  }

  public updateLoggedInState(status: boolean) {
    this.authSubject.next(status);
  }

  public isAuthenticated(): Observable<boolean> {
    if (this.getToken()) {
      this.updateLoggedInState(true);
    }
    return this.isLoggedIn$;
  }

  public getRole(): string | null {
    return localStorage.getItem('role');
  }

  public isAdmin(): boolean {
    const userRole = this.getRole();
    return userRole === 'ADMIN';
  }

  public isCollab(): boolean {
    const userRole = this.getRole();
    return userRole === 'COLLAB';
  }

  public isManager(): boolean {
    const userRole = this.getRole();
    return userRole === 'MANAGER';
  }
}
