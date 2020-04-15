import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';
import { NavigationService } from './modules/shared/services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isNavigation: boolean;
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

  doRememberMe(): void {
    const isRememberMe = localStorage.getItem('rememberMe');
    if (isRememberMe === 'false') {
      localStorage.removeItem('authToken');
    }
  }

  private initSubscribtion(): void {
    this.navigationService.getAuthorizationEvent().subscribe(
      checking => this.isNavigation = checking
    )
  }

}
