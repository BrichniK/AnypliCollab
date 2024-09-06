import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation';
@Injectable({

  providedIn: 'root'

})

export class ReclamationService {
  
  constructor(private http: HttpClient) {

  }

    private baseUrl = 'http://localhost:8080/reclamation';

    addReclamation(reclamation: Reclamation): Observable<Reclamation> {
        return this.http.post<Reclamation>(`${this.baseUrl}/addreclamation`, reclamation);
    }


    updateReclamation(reclamation: Reclamation): Observable<Reclamation> {
        //console.log('password in service ' + user.password);
        return this.http.put<Reclamation>(`${this.baseUrl}/update/${reclamation.id}`, reclamation);
    }


    getAllReclamations(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/show`);
    }

    removeReclamation(id: String): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }

    getReclamationById(id: String):Observable<Reclamation>{
        return this.http.get<Reclamation>(`${this.baseUrl}/showById/${id}`);
    }
    
    getReclamationsByUserId(userId: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/user-reclas/${userId}`);
      }

      updateStatus(id: number, status: 'WAITING' | 'TREATED'): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/updates/${id}`, { status });
      }

      countReclaByStatus(): Observable<{ WAITING: number, TREATED: number }> {
        return this.http.get<{ WAITING: number, TREATED: number }>(`${this.baseUrl}/recla-count`);
      }

}
