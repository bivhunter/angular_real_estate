import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../model/home';
import { Router } from '@angular/router';
import { HomesService } from '../../services/homes.service';
import { Store } from '@ngrx/store';
import * as homesActions from 'src/app/store/actions/homes.action';

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
    private homesService: HomesService,
    private store: Store
  ) { }

  ngOnInit(): void {

  }

  onDeleteButton(): void {
    this.isPopup = true;
  }

  deleteHome(id: string | number) {
    this.store.dispatch(homesActions.deleteHome({id}));
    this.isPopup = false;
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
