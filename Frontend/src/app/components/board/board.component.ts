import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/boards.service';
import { Board } from 'src/app/models/board';
import { MessageService } from 'primeng/api';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

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
  submitted: boolean = false;
  wallpapers: string[] = [];

  constructor(
    private boardService: BoardService,
    private messageService: MessageService,
    private router: Router,
    private authservice : AuthService,
    private storageService : StorageService
  ) {}

  ngOnInit(): void {
    
    this.getAll();
    this.loadWallpapers();
  
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
    const storedUser = this.storageService.getUser();
  
    if (!this.board.name || !this.board.wallpaper) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Board name and wallpaper are required.',
        life: 3000,
      });
      return;
    }
  
    this.loading = true;
  
    // Add the userId to the board object
    this.board.userId = storedUser.id;
  
    this.boardService.addBoard(this.board).subscribe(
      (res) => {
        this.boards.push(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Board Created',
          life: 3000,
        });
        this.boards = [...this.boards];
        this.board = new Board();
        this.loading = false;
        this.boardDialog = false;
        this.submitted = false;
      },
      (error) => {
        console.error(error);
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
    this.boardDialog = true; // Open the dialog
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
