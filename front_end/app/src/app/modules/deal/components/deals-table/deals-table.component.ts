import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Deal } from '../../model/deal';
import { Observable, Subscription } from 'rxjs';
import { ISortingConf } from 'src/app/modules/shared/types/types';

import { Store } from '@ngrx/store';
import * as dealsActions from 'src/app/store/actions/deals.action';
import * as dealsSelectors from 'src/app/store/selectors/deals.selector';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-deals-table',
  templateUrl: './deals-table.component.html',
  styleUrls: ['./deals-table.component.css']
})
export class DealsTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() deals: Deal[];

  sortingConf$: Observable<ISortingConf>;
  private sortingEventSubscription: Subscription;

  displayedColumns: string[] = ['date', 'price', 'client', 'home'];

  @ViewChild(MatSort) matSort: MatSort;


  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  ngOnDestroy(): void {
    this.sortingEventSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.initSortingSubscription();
  }

  setSortingConf(sortingConf: ISortingConf) {
    this.store.dispatch(dealsActions.setSortingConf({sortingConf}));
  }

  private initSortingSubscription(): void {
    this.sortingEventSubscription = this.matSort.sortChange.subscribe(
      (event: ISortingConf) => {
        this.setSortingConf(event);
      }
    );
  }

  private getFromStore(): void {
    this.sortingConf$ = this.store.select(dealsSelectors.getSortingConf);
  }

}
