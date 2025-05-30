import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DifficultyService {
  private apiUrl = 'https://localhost:44376/api/difficulties';

  constructor(private http: HttpClient) {}

  getAllDifficulties(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
