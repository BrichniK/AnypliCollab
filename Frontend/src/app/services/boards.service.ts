import { Injectable } from '@angular/core';
import { Board } from '../models/board';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseUrl = 'http://localhost:4200/board';
  private apiUrl = 'http://localhost:4200/board';
  constructor(private http: HttpClient) {}

  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.baseUrl}/show`);
  }

  saveBoards(board: Board): Observable<Board> {
    return this.http.post<Board>(`${this.baseUrl}/save`, board);
  }
}
