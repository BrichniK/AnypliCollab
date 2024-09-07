import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/boards.service';
import { Board } from 'src/app/models/board';
import { Activity } from 'src/app/models/activity';
import { MessageService, ConfirmationService } from 'primeng/api';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boards: Board[] = [];
  loading: boolean = true;
  board: Board = new Board();
  boardDialog: boolean = false;
  confirmationVisible: boolean = false;  // Track the visibility of the confirmation dialog
  selectedBoardId: string | null = null;  // Store the ID of the board to be deleted
  wallpapers: string[] = [];
  isManager = false;
  submitted: boolean = false;
  constructor(
    private boardService: BoardService,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private activityService: ActivityService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.loadWallpapers();
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.isManager = this.authService.isManager();
      }
    });
  }

  getAll() {
    this.boardService.getAllBoards().subscribe(
      (response) => {
        this.boards = response.data;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading boards:', error);
        this.loading = false;
      }
    );
  }

  openAddBoardDialog() {
    this.board = new Board();
    this.boardDialog = true;
  }

  closeAddBoardDialog() {
    this.boardDialog = false;
  }

  loadWallpapers() {
    this.wallpapers = [
      'assets/images/Boards/b1.jpeg',
      'assets/images/Boards/b3.png',
      'assets/images/Boards/b5.jpeg',
      'assets/images/Boards/b6.jpg',
      'assets/images/Boards/b4.jpeg'
    ];
  }

  selectWallpaper(wallpaper: string) {
    this.board.wallpaper = wallpaper;
  }

  addBoard() {
    this.submitted = true;
  
    // Retrieve the stored user
    const user = this.storageService.getUser();
  
    if (!user || !user.id) {
      console.error('User ID not found');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'User ID not found.',
        life: 3000,
      });
      this.submitted = false;
      return;
    }
  
    // Ensure board name and wallpaper are provided
    if (!this.board.name || !this.board.wallpaper) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Board name and wallpaper are required.',
        life: 3000,
      });
      this.submitted = false;
      return;
    }
  
    this.loading = true;
  
    // Add the userId to the board object
    this.board.userId = user.id;
  
    this.boardService.addBoard(this.board).subscribe(
      (newBoard) => {
        // Success message and updating boards list
        this.boards.push(newBoard);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Board Created',
          life: 3000,
        });
  
        // Create activity for the new board
        const activity: Activity = {
          id: '',
          userId: user.id,
          boardId: newBoard.id,
          description: `Board ${newBoard.name} created`,
          date: new Date(),
        };
  
        this.activityService.addActivity(activity).subscribe(
          (newActivity) => {
            console.log('Activity created successfully:', newActivity);
          },
          (error) => {
            console.error('Error creating activity:', error);
          }
        );
  
        // Reset and close the dialog
        this.board = new Board();
        this.loading = false;
        this.boardDialog = false;
        this.submitted = false;
      },
      (error) => {
        // Error handling and message display
        console.error('Error adding board:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create Board',
          life: 3000,
        });
        this.loading = false;
        this.submitted = false;
      }
    );
  }
  

  drop(event: CdkDragDrop<Board[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }

  showDialog() {
    this.boardDialog = true;
  }

  prepareDeleteBoard(boardId: string) {
    this.selectedBoardId = boardId;
    this.confirmationVisible = true;
  }

  confirmDeleteAction() {
    if (this.selectedBoardId) {
      this.deleteBoard(this.selectedBoardId);
      this.confirmationVisible = false;  // Close the dialog after confirming
    }
  }

  deleteBoard(boardId: string) {
    this.boardService.removeBoard(boardId).subscribe(
      () => {
        this.boards = this.boards.filter(board => board.id !== boardId);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Board Deleted',
          life: 3000,
        });
      },
      (error) => {
        console.error('Error deleting board:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete Board',
          life: 3000,
        });
      }
    );
  }

  openBoardDetail(id: string): void {
    const selectedBoard = this.boards.find(board => board.id === id);
    if (selectedBoard) {
      this.router.navigate(['/board/showById', id], {
        queryParams: { wallpaper: selectedBoard.wallpaper }
      });
    }
  }
}