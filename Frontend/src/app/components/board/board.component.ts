import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/boards.service'; 
import { Board } from 'src/app/models/board';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boards: Board[] = [];
  loading: boolean = true;

  constructor(
    private boardService: BoardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  onBoardDrop(event: CdkDragDrop<Board[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openBoardDetail(board: Board) {
    this.router.navigate(['/board-detail', board.id]);
  }

  addBoard() {
    const boardName = prompt('Enter board title:', 'New Board');
    if (!boardName) return; 

    const boardImage = prompt('Enter image URL:', 'path/to/default/image.jpg');
    if (!boardImage) return; 

    const newBoard: Board = {
      id: this.boards.length + 1, // Generate a simple unique ID
      name: boardName,
      wallpaper: boardImage,
      tasks: [],
      users: []
    };

    this.boardService.saveBoards(newBoard).subscribe(
      (savedBoard) => {
        this.boards.push(savedBoard);
      },
      (error) => {
        console.error('Error saving board:', error);
      }
    );
  }

  getAll() {
    this.boardService.getAllBoards().subscribe(
      (response) => {
        console.log('Boards:', response);
        this.boards = response;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading boards:', error);
        this.loading = false;
      }
    );
  }
}
