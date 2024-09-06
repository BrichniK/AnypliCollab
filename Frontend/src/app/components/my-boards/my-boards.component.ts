import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/boards.service'; 
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Board } from 'src/app/models/board';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { NoTaskComponent } from '../no-task/no-task.component';

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrls: ['./my-boards.component.css']
})
export class MyBoardsComponent implements OnInit {
  boards: any[] = []; 
  errorMessage: string = '';
  isLoading: boolean = true;
  constructor(
    private boardService: BoardService, 
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    public dialog: MatDialog
  ) {}

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
          this.boards = response.data || []; 
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

  openBoardDetail(id: string): void {
    const selectedBoard = this.boards.find(board => board.id === id);
    if (selectedBoard) {
      if (!selectedBoard.tasks || selectedBoard.tasks.length === 0) {
        this.dialog.open(NoTaskComponent);
      } else {
        this.router.navigate(['/board/showById', id], {
          queryParams: { wallpaper: selectedBoard.wallpaper }
        });
      }
    }
  }
  
  drop(event: CdkDragDrop<Board[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }


}
