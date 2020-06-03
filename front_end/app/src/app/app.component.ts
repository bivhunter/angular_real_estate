import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Subscription, of, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { slideInAnimation } from './modules/shared/animation/animation';
import { TMessage } from './modules/shared/types/types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  isNavigationPanel$: Observable<boolean>;
  isStatusMessage = false;
  statusMessage: TMessage;

  private routeChangingSubscription: Subscription;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.doRememberMe();
    this.initSubscribtion();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  // implemented checkbox
  doRememberMe(): void {
    const isRememberMe = localStorage.getItem('rememberMe');
    if (isRememberMe === 'false') {
      localStorage.removeItem('authToken');
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  private initSubscribtion(): void {
    this.isNavigationPanel$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap((event: NavigationEnd) => {
        return of(!event.url.includes('authorization'));
      })
    );
  }

  private unsubscribe(): void {
    this.routeChangingSubscription.unsubscribe();
  }

}
