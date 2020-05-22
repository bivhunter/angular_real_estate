import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../model/home';
import { Observable } from 'rxjs';
import { TViewMode, ISortingConf } from 'src/app/modules/shared/types/types';
import * as homesSelector from 'src/app/store/selectors/homes.selector';
import * as homesActions from 'src/app/store/actions/homes.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-homes-list',
  templateUrl: './homes-list.component.html',
  styleUrls: ['./homes-list.component.css']
})
export class HomesListComponent implements OnInit {

  @Input() homes: Home[];
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
    this.store.dispatch(homesActions.setSortingConf({sortingConf}));
  }

  private getFromStore(): void {
    this.viewMode$ = this.store.select(homesSelector.getViewMode);
    this.sortingConf$ = this.store.select(homesSelector.getSortingConf)
  }

}
