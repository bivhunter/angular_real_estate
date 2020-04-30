import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { Client } from '../model/client';
import { Deal } from '../../deal/model/deal';
import { DealsService } from '../../deal/services/deals.service';
import { PopupService } from '../../shared/services/popup.service';
import { StatusMessageService } from '../../shared/services/status-message.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:3030/';
  private clientsUrl = `${this.baseUrl}client`; // add clients url

  private clientsListChangesSubject: Subject<any> = new Subject();

  set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  get authToken(): string {
    return localStorage.getItem('authToken');
  }

  constructor(
    private http: HttpClient,
    private dealsService: DealsService,
    private statusMessageService: StatusMessageService
  ) { }

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
          catchError(this.handleGetClientsError)
        );
      }));

    return clientsObservable;
  }

  addClient(client: Client): Observable<Client> {
    return this.http
      .post<Client>(this.clientsUrl, client, this.getHttpAuthOption())
      .pipe(
        tap(newClient => this.statusMessageService.showMessage(`New Client ${newClient.name} ${newClient.surname} was added`)),
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
      tap(() => {
        this.updateClientsList();
        this.statusMessageService.showMessage(`Adding was successful`);
      }),
      catchError((error) => throwError(error.statusText))
    );
  }

  deleteClient(id: number | string): Observable<any> {
    return this.http
      .delete<any>(`${this.clientsUrl}/${id}`, this.getHttpAuthOption())
      .pipe(
        tap((newClient) => {
          this.updateClientsList();
          this.statusMessageService.showMessage(`Client ${newClient.name} ${newClient.surname} was removed`);
        }),
        catchError(this.handleDeleteClientError)
      );
  }

  getClient(id: number | string): Observable<Client> {
    return this.http
      .get<Client>(`${this.clientsUrl}/${id}`, this.getHttpAuthOption())
      .pipe(
        catchError(this.handleGetClientError)
      );
  }

  updateClient(client: Client): Observable<Client> {
    return this.http
      .patch<Client>(`${this.clientsUrl}/${client.id}`, client, this.getHttpAuthOption())
      .pipe(
        tap(newClient => this.statusMessageService.showMessage(`${newClient.name} ${newClient.surname}'s profile was updated`)),
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
    return throwError(error.statusText);
  }

  private handleGetClientError(error: HttpErrorResponse): Observable<Client> {
    return throwError(error.statusText);
  }

  private handleDeleteClientError(error: HttpErrorResponse): Observable<any> {
    return throwError(error.statusText);
  }

  private handlePostClientError(error: HttpErrorResponse): Observable<Client> {
    return throwError(error.statusText);
  }

  private handleGetClientsError(error: HttpErrorResponse): Observable<Client[]> {
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

