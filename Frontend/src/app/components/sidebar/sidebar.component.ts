import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; // Import AuthService
import { TaskService } from 'src/app/services/task.service';
import { StorageService } from 'src/app/services/storage.service';
import { NoTaskComponent } from '../no-task/no-task.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  isAdmin = false; // Track if the user is an admin
  isCollab = false; // Track if the user is a collab
  isManager = false; // Track if the user is a manager
  isLoading = true;
  isProfileDropdownOpen = false;
  tasks: any;
  errorMessage: string = '';

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private authService: AuthService, // Inject AuthService
    private taskService: TaskService,
    private storageService: StorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.sidebarService.sidebarState$.subscribe((state: boolean) => {
      this.isOpen = state;
    });

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.isAdmin = this.authService.isAdmin();
        this.isCollab = this.authService.isCollab();
        this.isManager = this.authService.isManager();
      }
    });
  }

  openMyTasks(): void {
    this.isProfileDropdownOpen = false;
    const user = this.storageService.getUser();
    console.log('Retrieved user:', user);

    if (user && user.id) {
      this.isLoading = true;

      this.taskService.getUserTasks(user.id).subscribe(
        (response) => {
          console.log('Tasks response:', response);
          this.tasks = response.data || [];
          this.isLoading = false;

          if (this.tasks.length === 0) {
            console.log('No tasks found. Opening dialog.');
            this.dialog.open(NoTaskComponent);
          } else {
            console.log('Tasks found. Navigating to user boards.');
            this.router.navigate(['/board/user-boards']);
          }
        },
        (error) => {
          console.error('Error fetching tasks:', error);
          this.errorMessage = 'Failed to load tasks';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'User not found. Please log in again.';
      this.isLoading = false;
    }
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
