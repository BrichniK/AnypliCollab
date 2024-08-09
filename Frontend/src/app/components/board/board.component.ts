import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/boards.service'; 
import { Board,Task } from 'src/app/models/board';

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

  addBoard(name: string): void {
    if (name.trim()) {
      const newBoard: Board = {
        id: this.boards.length + 1,
        name,
        tasks: []
      };
      this.boardService.addBoard(newBoard);
      this.newBoardName = '';
    }
  }

  addTask(boardId: number, title: string, description: string): void {
    if (title.trim() && description.trim()) {
      const newTask: Task = {
        id: Math.floor(Math.random() * 10000),
        title,
        description,
        status: 'To Do'
      };
      this.boardService.addTaskToBoard(boardId, newTask);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    }
  }

  updateTaskStatus(boardId: number, taskId: number, status: 'To Do' | 'Proceeding' | 'Done'): void {
    this.boardService.updateTaskStatus(boardId, taskId, status);
  }
}
