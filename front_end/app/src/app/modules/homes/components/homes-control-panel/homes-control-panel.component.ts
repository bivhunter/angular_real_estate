import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as homesActions from 'src/app/store/actions/homes.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-homes-control-panel',
  templateUrl: './homes-control-panel.component.html',
  styleUrls: ['./homes-control-panel.component.css']
})
export class HomesControlPanelComponent implements OnInit {

  isViewsMenu = false;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.changeFilter('');
  }

  onAddButtonClick(): void {
    this.router.navigateByUrl('homes/adding');
  }

  onActivateCardView() {
    this.store.dispatch(homesActions.setViewMode({viewMode: 'cards'}));
    this.isViewsMenu = false;
  }

  onActivateListView() {
    this.store.dispatch(homesActions.setViewMode({viewMode: 'list'}));
    this.isViewsMenu = false;
  }

  changeFilter(searchingString: string): void {
    this.store.dispatch(homesActions.setSearchingString({searchingString}));
  }
}
