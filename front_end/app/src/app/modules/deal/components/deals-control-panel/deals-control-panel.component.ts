import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as dealsAction from 'src/app/store/actions/deals.action';
import * as dealsSelectors from 'src/app/store/selectors/deals.selector';
import { TViewMode } from 'src/app/modules/shared/types/types';

@Component({
  selector: 'app-deals-control-panel',
  templateUrl: './deals-control-panel.component.html',
  styleUrls: ['./deals-control-panel.component.css']
})
export class DealsControlPanelComponent implements OnInit {

  viewMode: TViewMode;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.changeFilter('');
    this.store.select(dealsSelectors.getViewMode).subscribe(
      viewMode => this.viewMode = viewMode
    );
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
