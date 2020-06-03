import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { TViewMode, ISortingConf } from 'src/app/modules/shared/types/types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as clientsSelector from 'src/app/store/selectors/clients.selector';
import * as clientsActions from 'src/app/store/actions/clients.action';


@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsListComponent implements OnInit {

  @Input() clients: Client[];

  viewMode$: Observable<TViewMode>;
  sortingConf$: Observable<ISortingConf>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  // set new sorting method
  changeSortingMethod(sortingConf: ISortingConf): void {
    this.store.dispatch(clientsActions.setSortingConf({sortingConf}));
  }

  private getFromStore(): void {
    this.viewMode$ = this.store.select(clientsSelector.getViewMode);
    this.sortingConf$ = this.store.select(clientsSelector.getSortingConf).pipe(
    );
  }

}
