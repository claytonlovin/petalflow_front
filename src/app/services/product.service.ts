import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  
  constructor(private http: HttpClient, private authService: AuthService) {};

  private getHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  getProductStatus(id_product: number) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/${id_product}/status`, { headers });
  }
  
  createProduct(productData: { 
    name: string; 
    baseUrlLocal: string;
    baseUrlProd: string;
    repository: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, productData, this.getHeaders());
  }
  

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  getProductById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  updateProduct(id: number, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, this.getHeaders());
  }
  
}
