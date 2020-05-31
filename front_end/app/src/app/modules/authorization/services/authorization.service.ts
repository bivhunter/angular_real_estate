import { Injectable, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StatusMessageService } from '../../shared/services/status-message.service';
import { Store, select } from '@ngrx/store';
import * as appActions from 'src/app/store/actions/app.actions';
import * as appSelectors from 'src/app/store/selectors/app.selector';
import { ProgressBarService } from '../../shared/services/progress-bar.service';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  private clientUrl =  `client`;
  private redirectUrl = 'dashboard';
  private isStoreInit = false;
  private initStor$: Subscription;



  constructor(
    private http: HttpClient,
    private router: Router,
    private statusMessageService: StatusMessageService,
    private store: Store,
    private progressBarService: ProgressBarService
  ) {
    this.initStor$ = this.store.select(appSelectors.getInitStoreStatus).subscribe(
      status => {
        this.isStoreInit = status;
      }
    );
  }

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
      this.clearStore();
      localStorage.removeItem('authToken');
      return true;
    });
  }

  // for auth.guard
  checkAuthorization(): Observable<boolean> {
    this.progressBarService.openProgressBar();
    return this.http.get<any>(this.clientUrl).pipe(
      map((resp) => {
        this.iniStore();
        return true;
      }),
      tap (resp => {
        this.progressBarService.closeProgressBar();
      }),
      catchError(error => {
        this.progressBarService.closeProgressBar();
        this.redirectToLogin();
        return of(false);
      })
    );
  }

  private clearStore(): void {
    this.store.dispatch(appActions.clearStore());
  }

  private iniStore() {
    if (this.isStoreInit) {
      return;
    }
    this.store.dispatch(appActions.initStore());
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }
}
