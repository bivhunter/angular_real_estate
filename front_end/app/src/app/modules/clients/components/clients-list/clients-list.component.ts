import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { TViewMode, TClientsSortingMethod, TClientsSortingField, ISortingConf } from 'src/app/modules/shared/types/types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';
import * as clientsActions from 'src/app/store/actions/clients.action';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  @Input() clients: Client[];

  viewMode$: Observable<TViewMode>;
  sortingConf$: Observable<ISortingConf>;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  // set new sorting method
  changeSortingMethod(sortingConf: ISortingConf): void {
    this.store.dispatch(clientsActions.setSortingConf({sortingConf}));
  }

  onClientProfileEvent(id: number | string): void {
    this.router.navigateByUrl('clients/profile/' + id);
  }

  private getFromStore(): void {
    this.viewMode$ = this.store.select(clientsSelector.getViewMode);
    this.sortingConf$ = this.store.select(clientsSelector.getSortingConf).pipe(
      tap(val => console.log(val))
    );
  }

}
