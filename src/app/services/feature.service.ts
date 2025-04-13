import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root',
})
export class FeatureService {

    private apiUrl = `${environment.apiUrl}/features`;
    
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

    getFeatures(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${id}`, this.getHeaders());
    }

    createFeature(feature: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, feature, this.getHeaders());
    }

    updateFeature(id: number, feature: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, feature, this.getHeaders());
    }

    deleteFeature(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getHeaders());
    }
}
