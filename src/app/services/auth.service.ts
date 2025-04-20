import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };  
    return this.http.post(`${this.apiUrl}/login`, body);
    
  }

  saveToken(token: string, id_user: number, email: string) {
    localStorage.setItem('id_user', id_user.toString());
    localStorage.setItem('email', email);
    localStorage.setItem('access_token', token);

  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token; 
  }
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

}
