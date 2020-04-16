import { Injectable, Pipe } from '@angular/core';
import { User } from './model/user';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthorizationService } from '../shared/services/authorization.service';
import { ClientService } from '../shared/services/clients.service';
import { Client } from '../clients/model/client';


@Injectable(
  { providedIn: 'root'}
)

export class UserService {

  baseUrl = 'http://localhost:3030/';

  userUrl = `${this.baseUrl}user`; // add user url
  authenticationUrl = `${this.baseUrl}authentication`; // login

  private set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  private get authToken(): string {
    return localStorage.getItem('authToken');
  }

  set userEmail(value: string) {
    localStorage.setItem('authUserEmail', value);
  }

  get userEmail(): string {
    return localStorage.getItem('authUserEmail');
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthorizationService,
    private clientsService: ClientService
  ) { }

  registerUser(user: User): Observable<User | string> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
      catchError(this.handleAuthorizationError)
    );
  }

  authorizeUser(user: User): Observable<any> {
    const body = {...user, strategy: 'local'};
    return this.http.post<any>(this.authenticationUrl, body, this.httpOptions).pipe(
      tap((resp) => {
        this.log(resp.accessToken);
        this.userEmail = user.email;
        this.authToken = resp.accessToken;
        const url = this.authService.getRedirectUrl();
        this.router.navigateByUrl(url);
      }),
      catchError(this.handleAuthorizationError)
    );
  }

  // return current user
  getUser(): Observable<User> {
    return this.getUserId().pipe(
      switchMap(id => {
        if (!id) {
          const getUserIdByEmail = this.getUserIdByEmail();
          return getUserIdByEmail.pipe(
            switchMap(newId => this.getUserById(newId))
          );
        }
        return this.getUserById(id);
      })
    );
  }

  getUserById(id: number | string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${id}`, this.getHttpAuthOption());
  }

  // get users List
  private getUsers(): Observable<User[]> {
    return this.http.get<any>(this.userUrl, this.getHttpAuthOption())
      .pipe(
        map(respobject => {
          return respobject.data;
        })
    );
  }

  // using when no clients
  private getUserIdByEmail(): Observable<string | number> {
    return this.getUsers().pipe(
      switchMap(users => {
        for (const user of users) {
          if (user.email === this.userEmail) {
            return of(user.id);
          }
        }
        return of(null);
      })
    );
  }

  // get userId from clients list
  private getUserId(): Observable<number | string> {
    return this.clientsService.getClients().pipe(
      switchMap(clients => {
        if (clients.length) {
          return of(clients[0].userId);
        } else {
          return of(null);
        }
      })
    );
  }

  private getHttpAuthOption() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      })
    };
  }

  private handleAuthorizationError(error: HttpErrorResponse): Observable<string> {
    // this.logError.call(this, error);
    console.log(error);
    if (error.statusText === 'Bad Request') {      // using when invalid data in request
      if (error.error.errors instanceof Array) {   // respons has array of errors
        const errorMessage = error.error.errors.map((curentError: any) => curentError.message).join('; ');
        return throwError(errorMessage);
      }
      return throwError(error.error.message);
    }

    if (error.statusText === 'Unauthorized') {    // using when user Unauthorized
      return throwError(error.error.message);
    }

    return throwError(error.statusText);         // other errors
    }

  private log(user: User | string): void {
    console.log(user);
  }

}
