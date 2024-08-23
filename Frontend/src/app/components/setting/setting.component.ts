import { Component, OnInit } from '@angular/core';
import { settingService } from 'src/app/services/setting.service';
import { Role, User } from 'src/app/models/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [MessageService]  // PrimeNG MessageService provider
})
export class SettingsComponent implements OnInit {
  users: User[] = [];  // List of users
  loading: boolean = true;  // Show loading spinner
  boardDialog: boolean = false;  // Dialog visibility
  selectedUser: User = {} as User;  // Selected user for editing
  selectedImageURL: string | ArrayBuffer | null = null;  // Selected profile image
  submitted: boolean = false;  // Form submission status
  roles: { label: string, value: Role }[] = [  // User roles
    { label: 'Manager', value: Role.MANAGER },
    { label: 'Collab', value: Role.COLLAB }
  ];

  constructor(
    private settingService: settingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAll();  // Load users
  }

  getAll() {
    this.settingService.getAllUsers().subscribe(
      (response) => {
        this.users = response.data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    );
  }

  deleteUser(userId: string) {
    this.settingService.removeUser(userId).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== userId);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Deleted',
          life: 3000,
        });
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete user',
          life: 3000,
        });
      }
    );
  }

  openDialog(user: User) {
    this.selectedUser = { ...user };  // Clone the user data
    this.boardDialog = true;  // Open dialog
  }

  hideDialog() {
    this.boardDialog = false;  // Close dialog
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageURL = e.target.result;
        this.selectedUser.imageURL = e.target.result;  // Base64 image string
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  save() {
    this.submitted = true;

    this.settingService.updateUser(this.selectedUser.id, {
      ...this.selectedUser,
      imageURL: this.selectedUser.imageURL,
      password: this.selectedUser.password,  // Ensure password is handled correctly in the backend
    }).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Updated',
          life: 3000,
        });
        this.hideDialog();
        this.getAll();  // Reload the user list
      },
      (error) => {
        console.error('Error updating user:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update user',
          life: 3000,
        });
      }
    );
  }
}
