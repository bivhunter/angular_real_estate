import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as homesActions from 'src/app/store/actions/homes.action';
import * as homesSelectors from 'src/app/store/selectors/homes.selector';
import { Store } from '@ngrx/store';
import { TViewMode } from 'src/app/modules/shared/types/types';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-homes-control-panel',
  templateUrl: './homes-control-panel.component.html',
  styleUrls: ['./homes-control-panel.component.css']
})
export class HomesControlPanelComponent implements OnInit {

  viewMode$: Observable<TViewMode>;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.changeFilter('');
    this.viewMode$ = this.store.select(homesSelectors.getViewMode);
  }

  onAddButtonClick(): void {
    this.router.navigateByUrl('homes/adding');
  }

  onActivateCardView() {
    this.store.dispatch(homesActions.setViewMode({viewMode: 'cards'}));
  }

  onActivateListView() {
    this.store.dispatch(homesActions.setViewMode({viewMode: 'list'}));
  }

  changeFilter(searchingString: string): void {
    this.store.dispatch(homesActions.setSearchingString({searchingString}));
  }
}
