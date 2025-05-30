import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegionService {
  private apiUrl = 'https://localhost:44376/api/regions'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getAllRegions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRegionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addRegion(region: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, region);
  }

  updateRegion(id: string, region: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, region);
  }

  deleteRegion(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
