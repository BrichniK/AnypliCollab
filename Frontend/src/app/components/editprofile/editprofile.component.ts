import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { StorageService } from 'src/app/services/storage.service';
import { User, Role } from 'src/app/models/user';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  roles: Role[] = Object.values(Role);
  isLoading: boolean = true;
  errorMessage: string = '';
  submitted: boolean = false;
  imageFile: File | null = null;
  editForm: FormGroup;
  userImageUrl: string | ArrayBuffer | null | undefined
  user: User = {} as User;
  lastSaveTimestampKey = 'lastSaveTimestamp';

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private storageService: StorageService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUser();
    this.checkSaveCooldown();
  }

  loadUser(): void {
    const storedUser = this.storageService.getUser();
    if (storedUser && storedUser.id) {
      this.isLoading = true;
      this.userService.getUserById(storedUser.id).subscribe(
        (response: { data: User }) => {
          this.user = response.data;
          this.editForm.patchValue({
            name: this.user.name,
            email: this.user.email,
            role: this.user.role
          });
          this.userImageUrl = this.user.imageURL;
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'Failed to load user details';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'User not found. Please log in again.';
      this.isLoading = false;
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

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.userImageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);
      this.imageFile = file;
    }
  }

  checkSaveCooldown(): void {
    const lastSaveTimestamp = localStorage.getItem(this.lastSaveTimestampKey);
    if (lastSaveTimestamp) {
      const lastSaveDate = new Date(Number(lastSaveTimestamp));
      const now = new Date();
      const diffHours = Math.abs(now.getTime() - lastSaveDate.getTime()) / (1000 * 60 * 60);
      if (diffHours < 48) {
        this.errorMessage = `You can only save once every 48 hours. Please try again later.`;
       
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    const updatedUser: User = {
      ...this.user,
      ...this.editForm.value,
      imageURL: this.user.imageURL
    };

    this.userService.updateUser(this.user.id, updatedUser).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.updateLastSaveTimestamp(); 
       
      },
      (error) => {
        console.error('Error updating user:', error);
        this.errorMessage = 'Failed to update user details';
      }
    );
  }

  updateLastSaveTimestamp(): void {
    const now = new Date();
    localStorage.setItem(this.lastSaveTimestampKey, now.getTime().toString());
  }
}
