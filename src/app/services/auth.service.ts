import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IAuthResponse } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }
  login(user: string, pass: string): Observable<IAuthResponse> {
    const access = {
      User: user,
      Pass: pass
    };
    return this.http.post<IAuthResponse>(`${this.baseUrl}/login`, access).pipe(
      tap(response => {
        console.log('Respuesta del login:', response);
      }),
      catchError(error => {
        console.error('Error al realizar el login:', error);
        return throwError(error);
      })
    );
  }
}
