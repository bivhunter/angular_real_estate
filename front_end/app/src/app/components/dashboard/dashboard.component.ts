import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { AppRoutingModule } from './../../app-routing.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: AppRoutingModule
  ) { }

  ngOnInit(): void {
    // this.userService.checkAuthorization().subscribe(
    //   () => {
    //     //
    //   },
    //   () => {}  //redirect
    // );
  }

  onLogout(): void {
    localStorage.removeItem('token');
  }

}
