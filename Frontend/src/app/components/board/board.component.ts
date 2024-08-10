import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/boards.service'; 
import { Board } from 'src/app/models/board';
import { CdkDragDrop,moveItemInArray,transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boards: Board[] = [];
  newBoardName: string = '';

 

  constructor(private boardService: BoardService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.boards = this.boardService.getBoards();
  }
  parkingSpots: { boards: Board[] }[] = [
    {  boards: [] },
    {  boards: [] },
    { boards: [] },
    // add more spots as needed
  ];



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
    // Prompt user for board details
    const boardName = prompt('Enter board title:', 'New Board');
    if (!boardName) return; // Cancel if no name provided

    const boardImage = prompt('Enter image URL:', 'path/to/default/image.jpg');
    if (!boardImage) return; // Use default image if no URL provided

    const newBoard: Board = {
     id :1,
      name: boardName,
      wallpaper: boardImage,
      tasks: [] ,
      users:[]
     
    };

    this.boards.push(newBoard);
    // Save the new board to your service or backend
    this.boardService.saveBoards(newBoard);
  }
}