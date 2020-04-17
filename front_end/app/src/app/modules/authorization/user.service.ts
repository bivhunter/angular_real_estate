import { Injectable, Pipe } from '@angular/core';
import { User } from './model/user';
import { Observable, of, throwError, from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthorizationService } from '../shared/services/authorization.service';
import * as jwt_decode from "jwt-decode";
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
    const id = this.getUserId();
    return this.http.get<User>(`${this.userUrl}/${id}`, this.getHttpAuthOption());
  }

  updateUser(user: User): Observable<User> {
    const id = this.getUserId();
    return this.http.patch<User>(`${this.userUrl}/${id}`, user, this.getHttpAuthOption()).pipe(
      tap(newUser => console.log(newUser)),
      catchError(err => {
        console.log(err);
        return throwError('err');
      }
    ));
  }

  increaseUserLevel(): Observable<any> {
    return this.getUser().pipe(
      switchMap(user => {
        const newUser = { level: ++ user.level} as User;
        return this.updateUser(newUser);
      })
    );
  }

  // get userId from token
  private getUserId(): number | string {
    return jwt_decode(this.authToken).userId;
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
