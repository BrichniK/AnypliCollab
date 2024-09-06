import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/boards.service'; 
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-my-boards-tasks',
  templateUrl: './my-boards-tasks.component.html',
  styleUrls: ['./my-boards-tasks.component.css']
})
export class MyBoardsTasksComponent implements OnInit {
  boards: any[] = []; 
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private boardService: BoardService, 
    private authService: AuthService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loadBoardsAndTasks();
  }

  loadBoardsAndTasks(): void {
    const user = this.storageService.getUser();
    console.log('Retrieved user:', user);

    if (user && user.id) {
      this.isLoading = true;

      this.boardService.getBoardsByUserId(user.id).subscribe(
        (response) => {
          console.log('Boards response:', response);
          this.boards = response.data || []; // Assign the fetched boards with tasks
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching boards:', error);
          this.errorMessage = 'Failed to load boards and tasks';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'User not found. Please log in again.';
      this.isLoading = false;
    }
  }
}
