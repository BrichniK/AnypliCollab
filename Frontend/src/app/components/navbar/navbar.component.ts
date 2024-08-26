import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isProfileDropdownOpen = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private authService: AuthService,
    private profileservice: ProfileService
  ) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  // editProfile() {
  //   this.isProfileDropdownOpen = false; // Close the dropdown after clicking the button
  //   this.router.navigate(['/edit-profile']); // Navigate to the edit profile page
  // }
}
