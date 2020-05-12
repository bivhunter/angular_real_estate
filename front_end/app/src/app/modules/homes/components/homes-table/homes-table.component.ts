import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../model/home';
import { Router } from '@angular/router';
import { THomesSortingField, THomesSortingMethod } from 'src/app/modules/shared/types/types';
import { Observable } from 'rxjs';
import * as homesSelector from 'src/app/store/selectors/homes.selector';
import * as homesActions from 'src/app/store/actions/homes.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-homes-table',
  templateUrl: './homes-table.component.html',
  styleUrls: ['./homes-table.component.css']
})
export class HomesTableComponent implements OnInit {

  homeForDelete: Home;
  currentHome: Home;

  isPopupListClients = false;
  isAdding: boolean;
  isPopup = false;
  @Input() homes: Home[];

  // for sorting
  sortingMethod$: Observable<THomesSortingMethod>;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  setSortingField(sortingMethodField: THomesSortingField) {
    this.store.dispatch(homesActions.setSortingField({sortingMethodField}));
  }

  // show home details
  onDetailsButton(id: string | number): void {
    this.router.navigateByUrl(`homes/details/${id}`);
  }

  // show popup menu
  onDeleteButton(home: Home): void {
    this.homeForDelete = {...home};
    this.isPopup = true;
  }

  deleteHome(id: string | number): void {
    this.store.dispatch(homesActions.deleteHome({id}));
    this.isPopup = false;
  }

  onAddClient(home: Home): void {
    this.currentHome = home;
    this.isAdding = true;
    this.isPopupListClients = true;
  }

  onViewedClient(home: Home): void {
    this.currentHome = home;
    this.isAdding = false;
    this.isPopupListClients = true;
  }

  private getFromStore(): void {
    this.sortingMethod$ = this.store.select(homesSelector.getSortingMethod);
  }

}
