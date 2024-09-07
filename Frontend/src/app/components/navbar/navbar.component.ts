import { Component, OnInit, AfterViewInit, ChangeDetectorRef, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { NoTaskComponent } from '../no-task/no-task.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';  
import { StorageService } from 'src/app/services/storage.service';
import { BoardService } from 'src/app/services/boards.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Input() isCollab: boolean = true;
  isProfileDropdownOpen = false;
  isSidebarOpen = false;
  tasks: any[] = [];  
  boards: any[] = [];  
  isLoading: boolean = true; 
  errorMessage: string = '';

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private taskService: TaskService,  
    public dialog: MatDialog,
    private storageService: StorageService,
    private boardService: BoardService,
    private cdr: ChangeDetectorRef
  ) {
    this.sidebarService.sidebarState$.subscribe(state => {
      this.isSidebarOpen = state;
    });
  }

  ngOnInit(): void {
    console.log('isCollab on init:', this.isCollab);
  }

  ngAfterViewInit(): void {
    console.log('isCollab after view init:', this.isCollab);
  }

  toggleCollabStatus(status: boolean) {
    this.isCollab = status;
    this.cdr.detectChanges();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  editProfile() {
    this.isProfileDropdownOpen = false; 
    this.router.navigate(['/user/showById/:id']); 
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

  myrecla() {
    this.isProfileDropdownOpen = false; 
    this.router.navigate(['reclamation/user-reclas']); 
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.navbar-menu button');

    
    if (this.isSidebarOpen && !sidebar?.contains(target) && !menuButton?.contains(target)) {
      this.isSidebarOpen = false;
      this.sidebarService.toggleSidebar(); 
    }

   
    if (!target.closest('.navbar-actions')) {
      this.isProfileDropdownOpen = false;
    }
  }
}
