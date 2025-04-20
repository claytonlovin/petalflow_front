
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';  // Corretamente ajustado
import { AuthService } from './auth.service';

interface TokenResponse {
  token: string;
  date_created: string;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private apiUrl = `${environment.apiUrl}/executionTest`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  generateToken(id_user: number, email: string): Observable<string> {
    const body = { id_user, email };
    return this.http.post(this.apiUrl + '/generateTokenCaseTest', body, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }
  
    
  checkTokenStatus(id_user: number): Observable<{ status: boolean, date_created?: string }> {
    return this.http.get<{ status: boolean, date_created?: string }>(
      `${this.apiUrl}/verifyStatusTokenCaseTestUser/${id_user}`,
      { headers: this.getHeaders() }
    );
  }
  

  deleteToken(id_user: number): Observable<{ status: boolean }> {
    return this.http.delete<{ status: boolean }>(
      `${this.apiUrl}/deleteTokenCaseTest/?id_user=${id_user}`,
      { headers: this.getHeaders() }
    );
  }
  
}


