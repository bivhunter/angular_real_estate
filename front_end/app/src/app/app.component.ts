import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';
import { NavigationService } from './modules/shared/services/navigation.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  isNavigation: boolean;

  private authenticationSubscription: Subscription;

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
    this.authenticationSubscription = this.navigationService.getAuthorizationEvent().subscribe(
      checking => this.isNavigation = checking
    );
  }

  private unsubscribe(): void {
    this.authenticationSubscription.unsubscribe();
  }

}
