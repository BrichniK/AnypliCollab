import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  isAdmin = false; // Track if the user is an admin

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.sidebarService.sidebarState$.subscribe((state: boolean) => {
      this.isOpen = state;
    });

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.isAdmin = this.authService.isAdmin(); // Check if user is an admin
      }
    });
  }

  showBoards() {
    this.router.navigate(['/board']); 
  }

  setting() {
    this.router.navigate(['/setting']); 
  }

  dashboard() {
    this.router.navigate(['/dashboard']); 
  }
}
