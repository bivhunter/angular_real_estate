import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { slideInAnimation } from './modules/shared/animation/animation';
import { StatusMessageService } from './modules/shared/services/status-message.service';
import { TMessage } from './modules/shared/types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  isNavigationPanel: boolean;
  isStatusMessage = false;
  statusMessage: TMessage;


  private authenticationSubscription: Subscription;
  private routeChangingSubscription: Subscription;
  private messageChangesSubscription: Subscription;

  constructor(
    private router: Router,
    private statusMessageService: StatusMessageService
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
     // listen router navigation
    this.routeChangingSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      (event: NavigationEnd) => {
        const url = event.url;
        this.isNavigationPanel = !url.includes('authorization');
      }
    );

    // listen MessageService
    this.messageChangesSubscription = this.statusMessageService.getStatusMessageEvent()
      .subscribe(
        message => this.showMessage(message)
      );
  }

  private showMessage(message: TMessage) {
    this.statusMessage = message;
    this.isStatusMessage = true;
    setTimeout(() => {
      this.isStatusMessage = false;
    }, 4000);
  }

  private unsubscribe(): void {
    this.authenticationSubscription.unsubscribe();
    this.routeChangingSubscription.unsubscribe();
    this.messageChangesSubscription.unsubscribe();
  }

}
