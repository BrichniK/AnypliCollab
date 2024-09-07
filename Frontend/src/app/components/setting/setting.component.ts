import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { User,Role } from 'src/app/models/user';
import { settingService } from 'src/app/services/setting.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NgModel } from '@angular/forms';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

@Component({
  selector: 'app-settings',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers: [MessageService] 
})
export class SettingsComponent implements OnInit {

  users: User[] = [];
  loading: boolean = true;
  userDialog: boolean = false;
  user: User = {} as User;
  selectedUsers: User[] = [];
  isAdmin: boolean = false;
  exportColumns: any[] | undefined;
  cols: any[] | undefined;
  countUsers: number = 0;
  roles: any[] = Object.values(Role);
  selectedRole: Role = Role.COLLAB;
  submitted: boolean = false;
  userImageUrl: string | ArrayBuffer | null = '';
  registerForm!: FormGroup;



  constructor(

      private messageService: MessageService,
      private settingService: settingService,
      private authService : AuthService
  ) {}

  ngOnInit(): void {
 
      this.getAll();
      
      this.registerForm = new FormGroup({
          name: new FormControl('', [Validators.required]),
          email: new FormControl('', [Validators.required, Validators.email]),
          role: new FormControl(Role.COLLAB, [Validators.required]),
          active: new FormControl(true),
      });
    
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

  openNew() {
      this.user = {} as User;
      this.user.active = true;
      this.user.role = Role.COLLAB;
      this.userDialog = true;
  }

  editUser(user: User) {
      this.user = { ...user };
      this.userDialog = true;
  }

  deleteUser(user: User) {
      this.settingService.removeUser(user.id).subscribe({
          next: (res) => {
              this.users = this.users.filter((val) => val.id !== user.id);
          },
      });
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '../../../assets/images/Avatars/';  
  }

  hideDialog() {
      this.userDialog = false;
      this.submitted = false;
  }

  save() {
    this.submitted = true;
  
    if (!this.user.name || !this.user.email || !this.user.password) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Name, Email, and Password are required.',
        life: 3000,
      });
      return;
    }
  
    this.loading = true;
  
    if (this.user.id) {
      this.settingService.updateUser(this.user).subscribe(
        () => {
          // Refresh the list of users
          this.getAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'User Updated',
            life: 3000,
          });
  
          // Close the dialog and reset the form
          this.userDialog = false;
          this.loading = false;
          this.submitted = false;
        },
        (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update User',
            life: 3000,
          });
          this.loading = false;
          this.submitted = false;
        }
      );
    } else {
      // For adding a new user if applicable
      this.settingService.addUser(this.user).subscribe(
        () => {
          // Refresh the list of users
          this.getAll();
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'User Added',
            life: 3000,
          });
  
          // Close the dialog and reset the form
          this.userDialog = false;
          this.loading = false;
          this.submitted = false;
        },
        (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add User',
            life: 3000,
          });
          this.loading = false;
          this.submitted = false;
        }
      );
    }
  }
  


  
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            this.userImageUrl = e.target!.result;
        };
        reader.readAsDataURL(file);

        this.user.imageURL = file.name;
    }
}

  findIndexById(_id: String) {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === _id) {
            index = i;
            break;
        }
    }
    return index

}
      }