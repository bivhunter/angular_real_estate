import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { slideInAnimation } from './modules/shared/animation/animation';
import { StatusMessageService } from './modules/shared/services/status-message.service';
import { TMessage } from './modules/shared/types/types';
import { InitDataService } from './modules/shared/services/init-data.service';


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


  private routeChangingSubscription: Subscription;
  private messageChangesSubscription: Subscription;

  constructor(
    private router: Router,
    private statusMessageService: StatusMessageService,
    private initDataService: InitDataService
  ) {}

  ngOnInit(): void {
    // this.initData();
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
      filter(event => event instanceof NavigationStart)
    ).subscribe(
      (event: NavigationStart) => {
        const url = event.url;
        console.log('navigation start', url)
        this.isNavigationPanel = !url.includes('authorization');
        if (!url.includes('authorization')) {
          this.initData();
        }
      }
    );

    // listen MessageService
    this.messageChangesSubscription = this.statusMessageService.getStatusMessageEvent()
      .subscribe(
        message => this.showMessage(message)
      );
  }

  private initData(): void {
    this.initDataService.initData();
  }

  private showMessage(message: TMessage) {
    this.statusMessage = message;
    this.isStatusMessage = true;
    setTimeout(() => {
      this.isStatusMessage = false;
    }, 4000);
  }

  private unsubscribe(): void {
    this.routeChangingSubscription.unsubscribe();
    this.messageChangesSubscription.unsubscribe();
  }

}
