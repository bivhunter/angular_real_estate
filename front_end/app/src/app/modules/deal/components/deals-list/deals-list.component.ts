import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../../model/deal';
import { TViewMode, ISortingConf } from 'src/app/modules/shared/types/types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
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
  sortingConf$: Observable<ISortingConf>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  // set new sorting method
  changeSortingMethod(sortingConf: ISortingConf): void {
    this.store.dispatch(dealsActions.setSortingConf({sortingConf}));
  }

  private getFromStore(): void {
    this.viewMode$ = this.store.select(dealsSelectors.getViewMode);
    this.sortingConf$ = this.store.select(dealsSelectors.getSortingConf);
  }

}
