import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { Client } from './model/client';

@Injectable()
export class ClientService {

  baseUrl = 'http://localhost:3030/';
  clientsUrl = `${this.baseUrl}client`; // add clients url

  clientsSortSubject: Subject<string> = new Subject();
  clientsSortMethodBehaviorSubject: BehaviorSubject<string> = new BehaviorSubject('');

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
        tap((resp) => console.log(resp)),
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

  getClientsSortSubject(): Observable<string> {
    return this.clientsSortSubject.asObservable();
  }

  getClientsSortMethodSubject(): Observable<string> {
    return this.clientsSortMethodBehaviorSubject.asObservable();
  }

  sortClients(sortMethod: string): void {
    this.clientsSortSubject.next(sortMethod);
  }

  setSortClientsMethod(sortMethod: string): void {
    this.clientsSortMethodBehaviorSubject.next(sortMethod);
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
