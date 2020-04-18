import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, UrlTree, NavigationEnd } from '@angular/router';
import { NavigationService } from './modules/shared/services/navigation.service';
import { Subscriber, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  isNavigation: boolean;

  private authenticationSubscription: Subscription;
  private routeChangingSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    console.log('init');
    this.doRememberMe();
    this.initSubscribtion();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  doRememberMe(): void {
    const isRememberMe = localStorage.getItem('rememberMe');
    if (isRememberMe === 'false') {
      localStorage.removeItem('authToken');
    }
  }

  private initSubscribtion(): void {
    // this.authenticationSubscription = this.navigationService.getAuthorizationEvent().subscribe(
    //   checking => this.isNavigation = checking
    // );

     // listen router navigation
    this.routeChangingSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      (event: NavigationEnd) => {
        const url = event.url;
        console.log(url);
        this.isNavigation = !url.includes('authorization');
      }
    );
  }

  private unsubscribe(): void {
    this.authenticationSubscription.unsubscribe();
    this.routeChangingSubscription.unsubscribe();
  }

}
