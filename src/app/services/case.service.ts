import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
 
@Injectable({
  providedIn: 'root'
})
export class CaseService {
 
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCasesByProduct(id_product: number, params?: { skip?: number, limit?: number }): Observable<any> {
    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    let httpParams = new HttpParams();
    if (params) {
      if (params.skip !== undefined) {
        httpParams = httpParams.set('skip', params.skip.toString());
      }
      if (params.limit !== undefined) {
        httpParams = httpParams.set('limit', params.limit.toString());
      }
    }
  
    return this.http.get(`${this.apiUrl + '/cases'}/${id_product}`, { headers, params: httpParams });
  }
  
  
  createCase(caseData: any) {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  
    return this.http.post(`${this.apiUrl + '/cases'}`, caseData, { headers });
  }

  updateCase(id_case: number, caseData: any) {
    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put(`${this.apiUrl + '/cases'}/${id_case}`, caseData, { headers });
  }

  executTestCase(id_caseTest:number, id_feature: number, id_product: number) {
    const body = { id_caseTest, id_feature, id_product };
    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/executionTest/`, body, { headers });
  }
}
