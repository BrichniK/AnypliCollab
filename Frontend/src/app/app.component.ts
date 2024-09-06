import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNavbar = true;
  showSidebar = true;
  isCollab=true;

  constructor(private router: Router,private authService:AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !['/login', '/register'].includes(event.urlAfterRedirects);
        this.showSidebar = !['/login', '/register'].includes(event.urlAfterRedirects);
      }
    });
    this.authService.isAdmin()==true?this.isCollab=false:this.isCollab=true;
    this.authService.isManager()==true?this.isCollab=false:this.isCollab=true;
    this.authService.isCollab()==true?this.isCollab=true:this.isCollab=false;
    
  }
}
