import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

export interface DecodedToken {
  exp: number;
  roles: string[];
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:44376/api/Auth';

  login(username: string, password: string) {
    return fetch(`${this.apiUrl}/Login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).then(res => res.json());
  }

  register(username: string, password: string, roles: string[]) {
    return fetch(`${this.apiUrl}/Register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, roles })
    }).then(res => {
      if (!res.ok) {
        return res.text().then(errorText => {
          return Promise.reject({ message: errorText });
        });
      }
      return res.text();
    });
  }


  setToken(token: string) { localStorage.setItem('token', token); }
  getToken(): string | null { return localStorage.getItem('token'); }
  isLoggedIn(): boolean { return !!this.getToken(); }
  logout() { localStorage.removeItem('token'); }

  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  getUserRoles(): string[] {
    const decoded = this.getDecodedToken();
    if (!decoded) return [];

    // Check for standard roles array
    if (Array.isArray(decoded.roles)) return decoded.roles;

    // Handle Microsoft claim-style role
    const msRoleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    if (decoded[msRoleClaim]) {
      return [decoded[msRoleClaim]];
    }

    return [];
  }


  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }
}
