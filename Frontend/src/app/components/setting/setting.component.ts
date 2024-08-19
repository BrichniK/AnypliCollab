import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { Board } from 'src/app/models/board';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingsComponent implements OnInit {
  // boards: Board[] = [];
  // allUsers: User[] = [];
  // selectedBoardId!: number;
  // selectedUserId!: number;
  // newRole!: string; // To hold the new role for a user

  // constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    // this.loadBoards();
    // this.allUsers = this.settingService.getAllUsers(); // Fetch all users from the service
  }

  // addUserToBoard(): void {
  //   const selectedUser = this.allUsers.find(user => user.id === this.selectedUserId);
  //   if (selectedUser) {
  //     this.settingService.addUserToBoard(this.selectedBoardId, selectedUser).subscribe(
  //       (data: Board[]) => this.boards = data,
  //       error => console.error('Error adding user to board:', error)
  //     );
  //   }
  // }

  // removeUserFromBoard(userId: number): void {
  //   this.settingService.removeUserFromBoard(this.selectedBoardId, userId).subscribe(
  //     (data: Board[]) => this.boards = data,
  //     error => console.error('Error removing user from board:', error)
  //   );
  // }

  // changeUserRole(): void {
  //   this.settingService.changeUserRole(this.selectedBoardId, this.selectedUserId, this.newRole).subscribe(
  //     (data: Board[]) => this.boards = data,
  //     error => console.error('Error changing user role:', error)
  //   );
  // }

  // loadBoards(): void {
  //   this.settingService.getBoards().subscribe(
  //     (data: Board[]) => this.boards = data,
  //     error => console.error('Error fetching boards:', error)
  //   );
  // }
}
