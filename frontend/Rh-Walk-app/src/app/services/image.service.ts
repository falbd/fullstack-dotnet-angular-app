import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private apiUrl = 'https://localhost:44376/api/images';

  constructor(private http: HttpClient) {}

  // Updated to accept FormData directly
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

 
}
