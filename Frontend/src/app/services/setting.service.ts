import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Board } from '../models/board';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private boards: Board[] = [
    // {
    //   id: 1,
    //   name: 'Project Alpha',
    //   tasks: [
    //     { id: 1, title: 'Task 1', description: 'Task description 1', status: 'To Do', position: { left: 0, top: 0 }, wallpaper: 'task1-wallpaper.png' },
    //     { id: 2, title: 'Task 2', description: 'Task description 2', status: 'Proceeding', position: { left: 100, top: 100 }, wallpaper: 'task2-wallpaper.png' }
    //   ],
    //   wallpaper: 'board-wallpaper.png',
    //   users: [
    //     { id: 1, name: 'Alice', password: 'password123', email: 'alice@example.com', active: true, roles: [{ id: 1, name: 'Admin' }], imageURL: 'http://example.com/alice.jpg' },
    //     { id: 2, name: 'Bob', password: 'password456', email: 'bob@example.com', active: false, roles: [{ id: 2, name: 'User' }], imageURL: 'http://example.com/bob.jpg' }
    //   ]
    // }
  ];

  private allUsers: User[] = [
    { id: 1, name: 'Hend', password: 'password123', email: 'hend@example.com', active: true, roles: [{ id: 1, name: 'Admin' }], imageURL: 'http://example.com/hend.jpg' },
    { id: 2, name: 'Ahmed', password: 'password456', email: 'ahmed@example.com', active: false, roles: [{ id: 2, name: 'User' }], imageURL: 'http://example.com/ahmed.jpg' }
  ];

  constructor() {}

  getBoards(): Observable<Board[]> {
    return of(this.boards);
  }

  getAllUsers(): User[] {
    return this.allUsers;
  }

  // addUserToBoard(boardId: number, newUser: User): Observable<Board[]> {
  //   const board = this.boards.find(b => b.id === boardId);
  //   if (board) {
  //     board.users.push(newUser);
  //   }
  //   return of(this.boards);
  // }

  // removeUserFromBoard(boardId: number, userId: number): Observable<Board[]> {
  //   const board = this.boards.find(b => b.id === boardId);
  //   if (board) {
  //     board.users = board.users.filter(user => user.id !== userId);
  //   }
  //   return of(this.boards);
  // }

  // changeUserRole(boardId: number, userId: number, newRole: string): Observable<Board[]> {
  //   const board = this.boards.find(b => b.id === boardId);
  //   const user = board?.users.find(u => u.id === userId);
  //   if (user) {
  //     user.roles = [{ id: user.roles[0].id, name: newRole }];
  //   }
  //   return of(this.boards);
  // }
}
