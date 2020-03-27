import { Component, OnInit } from '@angular/core';
import { UserService } from '../../modules/authorization/user.service';
import { AuthorizationService } from '../../modules/shared/services/authorization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authorizationService.logOut();
  }

  onClients(): void {

  }

}
