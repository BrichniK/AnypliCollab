import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/boards.service';
import { Board } from 'src/app/models/board';
import { MessageService } from 'primeng/api';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

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
    private router: Router
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
      'assets/images/Boards/b2.jpg',
      'assets/images/Boards/b3.png',
    ];
  }

  selectWallpaper(wallpaper: string) {
    this.board.wallpaper = wallpaper;
  }

  addBoard() {
    this.submitted = true;

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
        this.board = new Board(); // Reset the board model
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

  deleteBoard(boardId: number) {
    // Implement board deletion logic here
  }

  openBoardDetail(board: Board, event: MouseEvent) {
    event.stopPropagation(); // Prevent the click from being interpreted as a drag
    this.router.navigate(['/board-detail', board.id]);
  }
}
