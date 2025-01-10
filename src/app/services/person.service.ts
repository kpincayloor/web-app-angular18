import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPersona, IPersonaResponse } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private baseUrl = `${environment.apiUrl}/persona`;

  constructor(private http: HttpClient) { }

  add(payload: IPersona): Observable<IPersonaResponse> {
      return this.http.post<IPersonaResponse>(`${this.baseUrl}`, payload);
    }
}
