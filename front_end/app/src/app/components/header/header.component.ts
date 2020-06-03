import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable} from 'rxjs';
import { AuthorizationService } from 'src/app/modules/authorization/services/authorization.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { User } from 'src/app/modules/user/model/user';
import { Store } from '@ngrx/store';
import * as userSelectors from 'src/app/store/selectors/user.selector';
import { ProgressBarService } from 'src/app/modules/shared/services/progress-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  isLogin: boolean;
  user$: Observable<User>;
  isProgressBar$: Observable<boolean>;

  private routeChangingSubscription: Subscription;

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private store: Store,
    private progressBarService: ProgressBarService
  ) { }

  ngOnInit(): void {
    this.initSubscribtion();
    this.getFromStore();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  logOut(): void {
    this.authorizationService.logOut();
  }

  private initSubscribtion(): void {
    this.isProgressBar$ = this.progressBarService.getProgressBarEvent();
    // listen router navigation
    this.routeChangingSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      (event: NavigationEnd) => {
        const url = event.url;
        if (url.includes('login')) {
          this.isLogin = true;
          this.isAuthenticated = false;
        } else if (url.includes('registration')) {
          this.isLogin = false;
          this.isAuthenticated = false;
        } else {
          this.isAuthenticated = true;
         // this.getUser();
        }
      }
    );
  }

  private getFromStore(): void {
    this.user$ = this.store.select(userSelectors.getUser).pipe(
    );
  }

  private unsubscribe(): void {
    this.routeChangingSubscription.unsubscribe();
  }
}
