import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../../model/deal';
import { Observable } from 'rxjs';
import { TDealsSortingMethod, TDealsSortingField } from 'src/app/modules/shared/types/types';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromDeals from 'src/app/store/reducers/deals.reducer';
import * as dealsActions from 'src/app/store/actions/deals.action';
import * as dealsSelectors from 'src/app/store/selectors/deals.selector';

@Component({
  selector: 'app-deals-table',
  templateUrl: './deals-table.component.html',
  styleUrls: ['./deals-table.component.css']
})
export class DealsTableComponent implements OnInit {

  @Input() deals: Deal[];

  sortingMethod$: Observable<TDealsSortingMethod>;

  constructor(
    private router: Router,
    private store: Store<fromDeals.State>
  ) { }

  ngOnInit(): void {
    this.initSubscription();
  }

   onHomeClick(id: string | number ): void {
    this.router.navigateByUrl(`homes/details/${id}`);
  }

  onClientClick(id: string | number ): void {
    if (!id) {
      return;
    }
    this.router.navigateByUrl(`clients/profile/${id}`);
  }

   // show deal details
  onDealClick(id: string | number): void {
    this.router.navigateByUrl(`deals/details/${id}`);
  }

  setSortingField(field: TDealsSortingField) {
    this.store.dispatch(dealsActions.setSortingField({sortingMethodField: field}));
  }

  private initSubscription(): void {
    this.sortingMethod$ = this.store.select(dealsSelectors.getSortingMethod);
  }

}
