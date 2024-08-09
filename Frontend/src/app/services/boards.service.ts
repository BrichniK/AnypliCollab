import { Injectable } from '@angular/core';
import { Board, Task } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boards: Board[] = [];

  constructor() {
    // Initialize with some dummy data if needed
    this.boards = [
      {
        id: 1,
        name: 'Project 1',
        tasks: [
          { id: 1, title: 'Task 1', description: 'Task 1 description', status: 'To Do' },
          { id: 2, title: 'Task 2', description: 'Task 2 description', status: 'Proceeding' }
        ]
      },
      // Add more boards
    ];
  }

  getBoards(): Board[] {
    return this.boards;
  }

  addBoard(board: Board): void {
    this.boards.push(board);
  }

  addTaskToBoard(boardId: number, task: Task): void {
    const board = this.boards.find(b => b.id === boardId);
    if (board) {
      board.tasks.push(task);
    }
  }

  updateTaskStatus(boardId: number, taskId: number, status: 'To Do' | 'Proceeding' | 'Done'): void {
    const board = this.boards.find(b => b.id === boardId);
    if (board) {
      const task = board.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = status;
      }
    }
  }
}
