import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {



  private baseUrl = 'http://localhost:8080/task';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/show`);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/addtask`, task);
}

updateTask(id: string, task: Task): Observable<Task> {
  return this.http.put<Task>(`${this.baseUrl}/update/${id}`, task);
}

}


