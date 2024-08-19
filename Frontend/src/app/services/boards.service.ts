import { Injectable } from '@angular/core';
import { Board } from '../models/board';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseUrl = 'http://localhost:8080/board';

  constructor(private http: HttpClient) {}

  getAllBoards(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/show`);
  }

  addBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(`${this.baseUrl}/addboard`, board);
}

removeBoard(id: String): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/deleteboard/${id}`);
}


}
