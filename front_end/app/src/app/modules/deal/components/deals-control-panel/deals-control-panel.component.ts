import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as dealsAction from 'src/app/store/actions/deals.action';

@Component({
  selector: 'app-deals-control-panel',
  templateUrl: './deals-control-panel.component.html',
  styleUrls: ['./deals-control-panel.component.css']
})
export class DealsControlPanelComponent implements OnInit {

  isViewsMenu = false;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.changeFilter('');
  }

  onActivateCardView() {
    // this.dealsViewService.setViewMode('cards');
    this.store.dispatch(dealsAction.setViewMode({viewMode: 'cards'}));
    this.isViewsMenu = false;
  }

  onActivateListView() {
    // this.dealsViewService.setViewMode('list');
    this.store.dispatch(dealsAction.setViewMode({viewMode: 'list'}));
    this.isViewsMenu = false;
  }

  changeFilter(searchingString: string): void {
    this.store.dispatch(dealsAction.setSearchingString({searchingString}));
  }

  onAddButtonClick(): void {
    this.router.navigateByUrl('deals/adding');
  }

}
