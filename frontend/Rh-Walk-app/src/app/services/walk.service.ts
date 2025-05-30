import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WalkService {
  private apiUrl = 'https://localhost:44376/api/walks'; // Adjust your base URL

  constructor(private http: HttpClient) {}

  getAllWalks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getWalkById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addWalk(walk: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, walk);
  }

  updateWalk(id: string, walk: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, walk);
  }

  deleteWalk(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
