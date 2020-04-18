import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from './../../modules/shared/services/navigation.service';
import { Subscription, Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/modules/shared/services/authorization.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { User } from 'src/app/modules/authorization/model/user';
import { UserService } from 'src/app/modules/authorization/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  isLogin: boolean;
  isUserProfile = false;
  user: User;

  private authenticationSubscription: Subscription;
  private routeChangingSubscription: Subscription;

  constructor(
    private navigationService: NavigationService,
    private authorizationService: AuthorizationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initSubscribtion();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  logOut(): void {
      this.authorizationService.logOut();
  }

  onPopupSubmit(user: User): void {
    this.userService.updateUser(user).subscribe(
      _ => {
        this.isUserProfile = false;
      }
    );
  }


  private initSubscribtion(): void {

    // listen router navigation
    this.routeChangingSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(
      (event: NavigationEnd) => {
        const url = event.url;
        console.log(url);
        if (url.includes('login')) {
          this.isLogin = true;
          this.clearUser();
        } else if (url.includes('registration')) {
          this.isLogin = false;
          this.clearUser();
        } else {
          this.getUser();
        }
      }
    );
  }

  private unsubscribe(): void {
    this.routeChangingSubscription.unsubscribe();
  }

  private getUser(): void {
    this.userService.getUser().subscribe(
      (user) => {
        this.isAuthenticated = true;
        const newUser = new User(user);
        this.user = newUser;
      },
      err => {
        console.log(err);
      }
    );
  }

  private clearUser(): void {
    this.user = null;
    this.isAuthenticated = false;
  }

}
