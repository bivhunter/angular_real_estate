import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Client } from '../models/client/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = 'http://localhost:3030/';

  clientsUrl = `${this.baseUrl}client`; // add clients url


  set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  get authToken(): string {
    return localStorage.getItem('authToken');
  }

  constructor(
    private http: HttpClient
  ) { }


  getClients(): Observable<Client[]> {
    return this.http
      .get<Client[]>(this.clientsUrl, this.getHttpAuthOption())
      .pipe(
        tap((clientList) => console.log(clientList)),
        catchError(this.handleGetClientsError));
  }

  addClient(client: Client): Observable<Client> {
    return this.http
      .post<Client>(this.clientsUrl, client, this.getHttpAuthOption())
      .pipe(
        tap((newClient) => console.log(newClient)),
        catchError(this.handlePostClientsError)
      );
  }

  deleteClient(id: number | string): Observable<any> {
    return this.http
      .delete<any>(`${this.clientsUrl}/${id}`, this.getHttpAuthOption())
      .pipe(
        tap((resp) => console.log(resp)),
        catchError(this.handlePostClientsError)
      );
  }

  private handleDeleteClientsError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError(error.statusText);
  }

  private handlePostClientsError(error: HttpErrorResponse): Observable<Client> {
    console.log(error);
    return throwError(error.statusText);
  }

  private handleGetClientsError(error: HttpErrorResponse): Observable<Client[]> {
    console.log(error);
    return throwError(error.statusText);
  }

  private getHttpAuthOption() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      })
    };
  }
}

