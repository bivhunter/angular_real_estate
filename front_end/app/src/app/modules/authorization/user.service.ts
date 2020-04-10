import { Injectable } from '@angular/core';
import { User } from './model/user';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthorizationService } from '../shared/services/authorization.service';


@Injectable()

export class UserService {

  baseUrl = 'http://localhost:3030/';

  userUrl = `${this.baseUrl}user`; // add user url
  authenticationUrl = `${this.baseUrl}authentication`; // login

  set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  get authToken(): string {
    return localStorage.getItem('authToken');
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthorizationService
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
        this.authToken = resp.accessToken;
        const url = this.authService.getRedirectUrl();
        this.router.navigateByUrl(url);
      }),
      catchError(this.handleAuthorizationError)
    );
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
