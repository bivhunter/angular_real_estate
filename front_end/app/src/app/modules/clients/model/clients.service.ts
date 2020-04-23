import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { Client } from './client';
import { Deal } from '../../deal/model/deal';
import { DealsService } from '../../deal/services/deals.service';
import { PopupService } from '../../shared/services/popup.service';

@Injectable({
  providedIn: 'root'
})
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
    private http: HttpClient,
    private dealsService: DealsService,
    private pop: PopupService
  ) { }


  getSub(next) {
    return this.pop.canDeactivate(next);
  }

  getClients(): Observable<Client[]> {

    // add clientOwnerId field to sold out home
    const mapClients = (clients: Client[], deals: Deal[]): Client[] => {
      return clients.map(client => {
          const homes = client.homes.map(home => {
            for (const deal of deals) {
              if (home.id === deal.home.id) {
                return {...home, clientOwner: deal.client || new Client()};
              }
            }
            return home;
          });

          return {...client, homes};
      });
    };


    const clientsObservable = this.dealsService.getDeals()
      .pipe(switchMap(deals => {
        return this.http
        .get<Client[]>(this.clientsUrl, this.getHttpAuthOption())
        .pipe(map(clients => mapClients(clients, deals)))
        .pipe(
          tap((clients) => console.log(clients)),
          catchError(this.handleGetClientsError)
        );
      }));

    return clientsObservable;
  }

  addClient(client: Client): Observable<Client> {
    return this.http
      .post<Client>(this.clientsUrl, client, this.getHttpAuthOption())
      .pipe(
        tap((newClient) => console.log(newClient)),
        catchError(this.handlePostClientError)
      );
  }

  addHomeToClient(homeId: string | number, clientId: string | number): Observable<Client> {
    const body = {
      homeAdd: homeId
    };
    return this.http
    .patch<Client>(`${this.clientsUrl}/${clientId}`, body, this.getHttpAuthOption())
    .pipe(
      tap(() => this.updateClientsList()),
      catchError((error) => throwError(error.statusText))
    );
  }

  deleteHomeFromClient(homeId: string | number, clientId: string | number): Observable<Client> {
    const body = {
      homeRemove: homeId
    };
    return this.http
    .patch<Client>(`${this.clientsUrl}/${clientId}`, body, this.getHttpAuthOption())
    .pipe(
      tap(() => this.updateClientsList()),
      catchError((error) => throwError(error.statusText))
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

