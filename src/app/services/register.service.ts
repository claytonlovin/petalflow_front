import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  register(
    name_user: string,
    email: string,
    phone: string,
    cpf_cnpj: string,
    password: string
  ): Observable<any> {
    const body = { name_user, email, phone, cpf_cnpj, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }
  
  saveToken(token: string) {
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