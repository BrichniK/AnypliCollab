import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isOpen = false;
 
  constructor(private sidebarService: SidebarService,private router: Router) {}

  ngOnInit(): void {
    this.sidebarService.sidebarState$.subscribe((state: boolean) => {
      this.isOpen = state;
    });
  }
  showBoards() {
    this.router.navigate(['/board']); // Navigates to the board route
  }
  setting() {
    this.router.navigate(['/setting']); // Navigates to the board route
  }
}
