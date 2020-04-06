import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../model/home';
import { Router } from '@angular/router';
import { HomesService } from '../../../shared/services/homes.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  @Input() home: Home;

  isPopup = false;
  isAdding: boolean;
  isPopupListClients = false;

  constructor(
    private router: Router,
    private homesService: HomesService
  ) { }

  ngOnInit(): void {

  }

  onDeleteButton(): void {
    this.isPopup = true;
  }

  deleteHome(id: string | number) {
    this.homesService.deleteHome(id)
    .subscribe(
      () => this.isPopup = false
    );
  }

  openClients(): void {
    this.isAdding = false;
    this.isPopupListClients = true;
  }

  addClient(): void {
    this.isAdding = true;
    this.isPopupListClients = true;
  }

  onDetailsButton(id: string | number) {
    this.router.navigateByUrl(`homes/details/${id}`);
  }
}
