import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Deal } from '../../model/deal';
import { TViewMode, TDealsSortingMethod, TDealsSortingField } from 'src/app/modules/shared/types/types';
import { Observable, Subscription } from 'rxjs';
import { DealsViewService } from '../../services/deals-view.service';
import { DealsSortingService } from '../../services/deals-sorting.service';
import { Store, select } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers/index';
import * as dealsSelectors from 'src/app/store/selectors/deals.selector';
import * as dealsActions from 'src/app/store/actions/deals.action';


@Component({
  selector: 'app-deals-list',
  templateUrl: './deals-list.component.html',
  styleUrls: ['./deals-list.component.css']
})
export class DealsListComponent implements OnInit {

  @Input() deals: Deal[];

  viewMode$: Observable<TViewMode>;
  sortingMethod$: Observable<TDealsSortingMethod>;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  // set new sorting method
  changeSortingMethod(field: TDealsSortingField): void {
    this.store.dispatch(dealsActions.setSortingField({sortingMethodField: field}));
  }

  private getFromStore(): void {
    this.viewMode$ = this.store.select(dealsSelectors.getViewMode);
    this.sortingMethod$ = this.store.select(dealsSelectors.getSortingMethod);
  }

}
