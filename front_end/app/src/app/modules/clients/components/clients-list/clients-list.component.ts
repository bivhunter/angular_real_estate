import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { TViewMode, TClientsSortingMethod, TClientsSortingField } from 'src/app/modules/shared/types/types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';
import * as clientsActions from 'src/app/store/actions/clients.action';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  @Input() clients: Client[];

  viewMode$: Observable<TViewMode>;
  sortingMethod$: Observable<TClientsSortingMethod>;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  // set new sorting method
  changeSortingMethod(sortingMethodField: TClientsSortingField): void {
    this.store.dispatch(clientsActions.setSortingField({sortingMethodField}));
  }

  onClientProfileEvent(id: number | string): void {
    this.router.navigateByUrl('clients/profile/' + id);
  }

  private getFromStore(): void {
    this.viewMode$ = this.store.select(clientsSelector.getViewMode);
    this.sortingMethod$ = this.store.select(clientsSelector.getSortingMethod);
  }

}
