import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
ProfileService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private sidebarService: SidebarService,
     private router:Router ,
      private authService:AuthService,
      private profileservice: ProfileService, ) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }  
  logout() {
    //this.authService.logout();
    this.router.navigate(['/login']);
    this.authService.logout();
}

profile() {
    this.profileservice.profile();
    this.router.navigate(['']);
}

}
