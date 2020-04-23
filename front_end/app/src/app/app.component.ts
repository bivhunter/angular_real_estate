import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isNavigationPanel: boolean;

  private authenticationSubscription: Subscription;
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

  private initSubscribtion(): void {
     // listen router navigation
    this.routeChangingSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      (event: NavigationEnd) => {
        const url = event.url;
        this.isNavigationPanel = !url.includes('authorization');
      }
    );
  }

  private unsubscribe(): void {
    this.authenticationSubscription.unsubscribe();
    this.routeChangingSubscription.unsubscribe();
  }

}
