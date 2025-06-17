import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaPermesso, RichiestaPermesso } from '../interfaces/request';
import { apiUrl } from '../../../secrets';

@Injectable({
  providedIn: 'root',
})
export class RichiesteService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<RichiestaPermesso[]> {
    return this.http.get<RichiestaPermesso[]>(`${apiUrl}/request`);
  }

  getDaApprovare(): Observable<RichiestaPermesso[]> {
    return this.http.get<RichiestaPermesso[]>(`${apiUrl}/request/da-approvare`);
  }

  getById(id: string): Observable<RichiestaPermesso> {
    return this.http.get<RichiestaPermesso>(`${apiUrl}/request/${id}`);
  }

  create(richiesta: Partial<RichiestaPermesso>): Observable<RichiestaPermesso> {
    return this.http.post<RichiestaPermesso>(`${apiUrl}/request`, richiesta);
  }

  update(
    id: string,
    richiesta: Partial<RichiestaPermesso>
  ): Observable<RichiestaPermesso> {
    return this.http.put<RichiestaPermesso>(
      `${apiUrl}/request/${id}`,
      richiesta
    );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/request/${id}`);
  }

  approva(id: string): Observable<RichiestaPermesso> {
    return this.http.put<RichiestaPermesso>(
      `${apiUrl}/request/${id}/approva`,
      {}
    );
  }

  rifiuta(id: string): Observable<RichiestaPermesso> {
    return this.http.put<RichiestaPermesso>(
      `${apiUrl}/request/${id}/rifiuta`,
      {}
    );
  }

  getAllCategories(): Observable<CategoriaPermesso[]> {
    return this.http.get<CategoriaPermesso[]>(`${apiUrl}/categories`);
  }
}
