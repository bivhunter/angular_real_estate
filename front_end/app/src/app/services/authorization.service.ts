import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  baseUrl = 'http://localhost:3030/';

  clientUrl =  `${this.baseUrl}client`;

  set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  get authToken(): string {
    return localStorage.getItem('authToken');
  }


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  logOut(): void {
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('authorization');
  }


  // for auth.guard
  checkAuthorization(): Observable<boolean> {
    return this.http.get<any>(this.clientUrl, this.getHttpAuthOption()).pipe(
      map(() => true),
      catchError(error => {
        if (error.statusText === 'Unauthorized') {
          this.router.navigateByUrl('authorization/login');
          return of(false);
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
}
