import { Component, OnInit } from '@angular/core';
import { settingService } from 'src/app/services/setting.service';
import { Role } from 'src/app/models/user';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingsComponent implements OnInit {
 constructor(private settingService: settingService ) {}
 users: User[] = [];
 loading: boolean = true;
 role? : Role
  ngOnInit(): void {
    this.getAll();
  
  }

  getAll() {
    this.settingService.getAllUsers().subscribe(
      (response) => {
        this.users = response.data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading boards:', error);
        this.loading = false;
      }
    );
  }

  deleteUser() {

  }
  save() {
    // this.settingService.(this.userId, this.user).subscribe(
    //   (response) => {
    //     alert('User successfully updated.');
    //     this.router.navigate(['/settings']);
    //   },
    //   (error) => {
    //     console.error('Error updating user:', error);
    //     alert('Failed to update user.');
    //   }
    // );
  }

}
