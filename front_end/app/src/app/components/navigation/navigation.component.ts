import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from './../../modules/shared/services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
  }

  openClients(): void {
    this.router.navigateByUrl('clients');
  }

}
