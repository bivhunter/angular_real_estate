import { Injectable } from '@angular/core';
import { User } from '../models/user/user';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, map} from 'rxjs/operators';
import { RouterModule, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:3030/';

  userUrl = `${this.baseUrl}user`; // add user url
  authenticationUrl = `${this.baseUrl}authentication`; // login
  clientUrl =  `${this.baseUrl}client`; // for check athorization

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
    private router: Router
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
        this.router.navigateByUrl('dashboard');
      }),
      catchError(this.handleAuthorizationError)
    );
  }

  // for auth.guard
  checkAuthorization(): Observable<boolean> {
    return this.http.get<any>(this.clientUrl, this.getHttpAuthOption()).pipe(
      map(() => true),
      catchError(error => {
        if (error.statusText === 'Unauthorized') {
          this.logError(error);
          this.router.navigateByUrl('login');
          return of(false);
        }
      })
    );
  }

  getHttpAuthOption() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`
      })
    };
  }

  logOut(): void {
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('login');
  }

  private handleAuthorizationError(error: HttpErrorResponse): Observable<User | string> {
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

  private logError(error: HttpErrorResponse | any): void {
    console.warn(error);
  }
}
