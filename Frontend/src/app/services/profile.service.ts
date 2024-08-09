import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private router: Router) { }

  profile (){
    // //window.localStorage.clear();
    // //this.updateLoggedInState(false);
    this.router.navigateByUrl('/profile');

  }
}
