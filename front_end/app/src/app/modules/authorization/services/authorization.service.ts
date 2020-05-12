import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StatusMessageService } from '../../shared/services/status-message.service';
import { Store } from '@ngrx/store';
import * as appActions from 'src/app/store/actions/app.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private clientUrl =  `client`;
  private redirectUrl = 'dashboard';

  constructor(
    private http: HttpClient,
    private router: Router,
    private statusMessageService: StatusMessageService,
    private store: Store
  ) { }


  logOut(): void {
    this.redirectToLogin().then(() => {
      this.statusMessageService.showMessage({
        status: 'info',
        text: `User logged out`
      });
    });
  }

  private async redirectToLogin(): Promise<boolean> {
    return await this.router.navigate(['authorization/login']).then(() => {
      this.store.dispatch(appActions.clearStore());
      localStorage.removeItem('authToken');
      return true;
    });
  }

  // for auth.guard
  checkAuthorization(): Observable<boolean> {
    return this.http.get<any>(this.clientUrl).pipe(
      map(() => {
        return true;
      }),

      catchError(error => {
        this.redirectToLogin();
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
}
