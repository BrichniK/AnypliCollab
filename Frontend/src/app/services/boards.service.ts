import { Injectable } from '@angular/core';
import { Board , Task} from '../models/board';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs';
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
  return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
}
getBoardById(id: string): Observable<Board> {
  return this.http.get<Board>(`${this.baseUrl}/showById/${id}`);
}


updateBoard(id: string, board: Board): Observable<Board> {
  return this.http.put<Board>(`${this.baseUrl}/update/${id}`, board);
}

getTasksByBoardId(boardId: string): Observable<Task[]> {
 
  return this.http.get<{ status: boolean; data: Task[] }>(`${this.baseUrl}/tasks/${boardId}`)
    .pipe(
  
      map(response => response.data)
    );
}
addTaskToBoard(id: string, task: Task): Observable<Task> {
  return this.http.post<Task>(`${this.baseUrl}/${id}/addTask`, task);
}


getTotalBoards(): Observable<number> {
  return this.http.get<{ totalBoards: number }>(`${this.baseUrl}/dashboard/total-boards`)
    .pipe(map(response => response.totalBoards));
}


}
