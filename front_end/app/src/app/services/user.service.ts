import { Injectable } from '@angular/core';
import { User } from './../models/user/user';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = 'http://localhost:3030/user';
  authenticationnUrl = 'http://localhost:3030/authentication';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
      tap((newUser) => this.log(newUser)),
      catchError(this.handleError)
    );
  }

  authorization(userData): Observable<string> {
    const body = {...userData, strategy: 'local'};
    return this.http.post<string>(this.authenticationnUrl, body, this.httpOptions).pipe(
      tap((token) => this.log(token)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    if (error.statusText === 'Bad Request') {
      const errorMessage = error.error.errors.map((curentError) => curentError.message).join('; ');
      return throwError(errorMessage);
    }

    if (error.statusText === 'Unauthorized') {
      return throwError(error.error.message);
    }

    return throwError(error.statusText);
  }

  private log(user: User | string): void {
    console.log(user);
  }

  private logError(error: string): void {
    console.log(error);
  }
}
