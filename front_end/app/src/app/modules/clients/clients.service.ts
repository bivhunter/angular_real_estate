import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { Client } from './model/client';

@Injectable()
export class ClientService {

  baseUrl = 'http://localhost:3030/';
  clientsUrl = `${this.baseUrl}client`; // add clients url

  clientsListChangesSubject: Subject<any> = new Subject();

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
        catchError(this.handlePostClientError)
      );
  }

  deleteClient(id: number | string): Observable<any> {
    return this.http
      .delete<any>(`${this.clientsUrl}/${id}`, this.getHttpAuthOption())
      .pipe(
        tap(() => this.updateClientsList()),
        catchError(this.handleDeleteClientError)
      );
  }

  getClient(id: number | string): Observable<Client> {
    return this.http
      .get<Client>(`${this.clientsUrl}/${id}`, this.getHttpAuthOption())
      .pipe(
        tap((resp) => console.log(resp)),
        catchError(this.handleGetClientError)
      );
  }

  updateClient(client: Client): Observable<Client> {
    return this.http
      .patch<Client>(`${this.clientsUrl}/${client.id}`, client, this.getHttpAuthOption())
      .pipe(
        tap((resp) => console.log(resp)),
        catchError(this.handlePatchClientError)
      );
  }

  getClientsListChangesEvent(): Observable<any> {
    return this.clientsListChangesSubject.asObservable();
  }

  private updateClientsList(): void {
    this.clientsListChangesSubject.next('');
  }

  private handlePatchClientError(error: HttpErrorResponse): Observable<Client> {
    console.log(error);
    return throwError(error.statusText);
  }

  private handleGetClientError(error: HttpErrorResponse): Observable<Client> {
    console.log(error);
    return throwError(error.statusText);
  }

  private handleDeleteClientError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError(error.statusText);
  }

  private handlePostClientError(error: HttpErrorResponse): Observable<Client> {
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

