import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private baseUrl = 'http://localhost:3030/';

  private clientUrl =  `${this.baseUrl}client`;
  private redirectUrl = 'dashboard';

  private set authToken(value: string) {
    localStorage.setItem('authToken', value);
  }

  private get authToken(): string {
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
        this.router.navigateByUrl('authorization/login');
        return of(false);
      })
    );
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
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
