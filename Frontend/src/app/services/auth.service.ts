import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authSubject = new BehaviorSubject<boolean>(false);
    private isLoggedIn$ = this.authSubject.asObservable();
    token!: any;
    currentUser = {};
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
            })
        );
    }

    register(data: any) {
        return this.http.post(this.endpoint + 'signup', data);
    }
    
    public getCart(){
        return localStorage.getItem('cart')
    }
    public getUserEmail(){
        return localStorage.getItem('email')
    }

    logout() {
        window.localStorage.clear();
        this.updateLoggedInState(false);

    }

    public setToken(token: string): void {
        localStorage.setItem('token', token);
      }

      public getToken(): string | null {
        const token = localStorage.getItem('token');
        console.log('Retrieved token:', token); // Debug log to check token value
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

    public getRole() {
        return localStorage.getItem('role');
    }
    public getId(){
        return localStorage.getItem('id')
    }
    public getTracabilite(){
        return localStorage.getItem('tracabilite')
    }
    public getTracabiliteMap(){
        return localStorage.getItem('tracabiliteMap')
    }
    public getAnalyse(){
        return localStorage.getItem('analyse')
    }
    public getVisualisation(){
        return localStorage.getItem('visualisation')
    }


    public isAnalyse() {
        const analyse = this.getAnalyse();
        // console.log('hfgfghfg',analyse)
        if(analyse=='true'){
            return true;
        }

        return false;
    }
    public isTracabilite() {
        const tracabilite = this.getTracabilite();
        if(tracabilite=='true'){
            return true;
        }

        return false;
    }
    public isTracabiliteMap() {
        const tracabiliteMap = this.getTracabiliteMap();
        if(tracabiliteMap=='true'){
            return true;
        }

        return false;
    }
    public isVisualisation() {
        const visualisation = this.getVisualisation();
        if(visualisation=='true'){
            return true;
        }

        return false;
    }
    public isAdmin() {
        const userRole = this.getRole();
        if (userRole === 'ADMIN') {
            return true;
        }
        return false;
    }
      
      public isCollab(): boolean {
        const userRole = this.getRole();
        return userRole === 'COLLAB';
      }


      public isManager(): boolean {
        const userRole = this.getRole();
        return userRole === 'MANAGER';
      }
      

    public getname(): string | null {
        return localStorage.getItem('name');
    }

}
