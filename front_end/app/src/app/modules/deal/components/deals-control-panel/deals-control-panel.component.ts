import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as dealsAction from 'src/app/store/actions/deals.action';
import * as dealsSelectors from 'src/app/store/selectors/deals.selector';
import { TViewMode } from 'src/app/modules/shared/types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deals-control-panel',
  templateUrl: './deals-control-panel.component.html',
  styleUrls: ['./deals-control-panel.component.css']
})
export class DealsControlPanelComponent implements OnInit, OnDestroy {

  viewMode: TViewMode;
  private storeSubscription: Subscription;
  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.changeFilter('');
    this.storeSubscription = this.store.select(dealsSelectors.getViewMode).subscribe(
      viewMode => this.viewMode = viewMode
    );
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  onActivateCardView() {
    this.viewMode = 'cards';
    this.store.dispatch(dealsAction.setViewMode({viewMode: 'cards'}));
  }

  onActivateListView() {
    this.viewMode = 'list';
    this.store.dispatch(dealsAction.setViewMode({viewMode: 'list'}));
  }

  changeFilter(searchingString: string): void {
    this.store.dispatch(dealsAction.setSearchingString({searchingString}));
  }
}
