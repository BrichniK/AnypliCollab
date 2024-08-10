import { Injectable } from '@angular/core';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private positions = [
    { left: 100, top: 100 },
    { left: 100, top: 300 },
    
  ];


  private boards: Board[] = [
    { id: 1, name: 'Project Planning', wallpaper: 'assets/images/Boards/b3.png' ,tasks:[],users:[]},
    { id: 2, name: 'Design Phase', wallpaper: 'assets/images/Boards/b2.jpg' ,tasks:[],users:[]}
  ];

  

  constructor() {
    // Initialize with some dummy data if needed

  }

  getBoards(): Board[] {
    return this.boards;
  }

  addboard(board: Board): void {
    this.boards.push(board);
  }

  addTaskToBoard(boardId: number, task: Task): void {
    const board = this.boards.find(b => b.id === boardId);

  }
  getBoardById(id: number): Board | undefined {
    return this.boards.find(board => board.id === id);
  }
  saveBoards(boards:Board){

  }

  // updateTaskStatus(boardId: number, taskId: number, status: 'To Do' | 'Proceeding' | 'Done'): void {
  //   const board = this.boards.find(b => b.id === boardId);
  //   if (board) {
  //     const task = board.tasks.find(t => t.id === taskId);
  //     if (task) {
  //       task.status = status;
  //     }
  //   }
  // }
}
