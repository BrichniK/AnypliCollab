import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/boards.service'; 
import { Board,Task } from 'src/app/models/board';
import { CdkDragDrop,moveItemInArray,transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boards: Board[] = [];
  newBoardName: string = '';
  newTaskTitle: string = '';
  newTaskDescription: string = '';
 

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boards = this.boardService.getBoards();
  }
  parkingSpots: { id: number; boards: Board[] }[] = [
    { id: 1, boards: [] },
    { id: 2, boards: [] },
    { id: 3, boards: [] },
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
}