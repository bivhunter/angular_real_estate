import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../authorization/services/authorization.service';
import * as jwt_decode from 'jwt-decode';
import { StatusMessageService } from '../../shared/services/status-message.service';
import { ProgressBarService } from '../../shared/services/progress-bar.service';

@Injectable(
  { providedIn: 'root'}
)

export class UserService {

  private userUrl = `user`; // add user url
  private authenticationUrl = `authentication`; // login

  private set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  private get authToken(): string {
    return localStorage.getItem('authToken');
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthorizationService,
    private statusMessageService: StatusMessageService,
    private progressBarService: ProgressBarService
  ) { }

  registerUser(user: User): Observable<User | string> {
    this.progressBarService.openProgressBar();
    return this.http.post<User>(this.userUrl, user).pipe(
      tap(newUser => {
        this.progressBarService.closeProgressBar();
        this.statusMessageService.showMessage({
        status: 'info',
        text: `${newUser.name} ${newUser.surname} successfull registered`
      });
    }),
      catchError(this.handleAuthorizationError())
    );
  }

  authorizeUser(user: User): Observable<any> {
    const body = {...user, strategy: 'local'};
    this.progressBarService.openProgressBar();
    return this.http.post<any>(this.authenticationUrl, body).pipe(
      tap((resp) => {
        this.log(resp.accessToken);
        this.authToken = resp.accessToken;
        const url = this.authService.getRedirectUrl();
        this.router.navigateByUrl(url);
      }),
      switchMap(() => this.getUser()),
      tap(newUser => {
        this.progressBarService.closeProgressBar();
        this.statusMessageService.showMessage({
        status: 'info',
        text: `${newUser.name} ${newUser.surname} logged in`
      });
    }),
      catchError(this.handleAuthorizationError())
    );
  }

  // return current user
  getUser(): Observable<User> {
    const id = this.getUserId();
    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  updateUser(user: User): Observable<User> {
    const id = this.getUserId();
    return this.http.patch<User>(`${this.userUrl}/${id}`, user).pipe(
      tap(
        newUser => this.statusMessageService.showMessage({
          status: 'info',
          text: `${newUser.name} ${newUser.surname}'s profile was updated`
        })
      ),
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

  private handleAuthorizationError(): (error: HttpErrorResponse) => Observable<string> {
    return (error) => {
      this.progressBarService.closeProgressBar();
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
      };
  }

  private log(user: User | string): void {
    
  }

}
