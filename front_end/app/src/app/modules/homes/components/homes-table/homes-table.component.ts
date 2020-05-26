import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Home } from '../../model/home';
import { ISortingConf } from 'src/app/modules/shared/types/types';
import { Observable } from 'rxjs';
import * as homesSelector from 'src/app/store/selectors/homes.selector';
import * as homesActions from 'src/app/store/actions/homes.action';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { HomesPopupService } from '../../services/homes-popup.service';

@Component({
  selector: 'app-homes-table',
  templateUrl: './homes-table.component.html',
  styleUrls: ['./homes-table.component.css']
})
export class HomesTableComponent implements OnInit, AfterViewInit {

  homeForDelete: Home;
  currentHome: Home;

  @ViewChild(MatSort) matSort: MatSort;

  displayedColumns: string[] = ['home', 'street', 'city', 'state', 'price', 'status', 'actions'];

  @Input() homes: Home[];

  // for sorting
  sortingConf$: Observable<ISortingConf>;

  constructor(
    private popup: HomesPopupService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  ngAfterViewInit(): void {
    this.initSortingSubscription();
  }

  setSortingConf(sortingConf: ISortingConf) {
    this.store.dispatch(homesActions.setSortingConf({sortingConf}));
  }

  // show popup menu
 onDeleteButton(home: Home): void {
    this.popup.openDeleteHome(home);
  }

  onAddClient(home: Home): void {
    this.popup.openAddingClientList(home);
  }

  onViewedClient(home: Home): void {
    this.popup.openClientsWhoViewed(home);
  }

  private getFromStore(): void {
    this.sortingConf$ = this.store.select(homesSelector.getSortingConf);
  }

  private initSortingSubscription(): void {
    this.matSort.sortChange.subscribe(
      (event: ISortingConf) => {
        this.setSortingConf(event);
      }
    );
  }

}
