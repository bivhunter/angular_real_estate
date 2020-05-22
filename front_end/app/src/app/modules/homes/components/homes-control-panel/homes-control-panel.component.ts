import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as homesActions from 'src/app/store/actions/homes.action';
import * as homesSelectors from 'src/app/store/selectors/homes.selector';
import { Store } from '@ngrx/store';
import { TViewMode } from 'src/app/modules/shared/types/types';

@Component({
  selector: 'app-homes-control-panel',
  templateUrl: './homes-control-panel.component.html',
  styleUrls: ['./homes-control-panel.component.css']
})
export class HomesControlPanelComponent implements OnInit {

  viewMode: TViewMode;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.changeFilter('');
    this.store.select(homesSelectors.getViewMode).subscribe(
      viewMode => this.viewMode = viewMode
    );
  }

  onAddButtonClick(): void {
    this.router.navigateByUrl('homes/adding');
  }

  onActivateCardView() {
    this.viewMode = 'cards';
    this.store.dispatch(homesActions.setViewMode({viewMode: 'cards'}));
  }

  onActivateListView() {
    this.viewMode = 'list';
    this.store.dispatch(homesActions.setViewMode({viewMode: 'list'}));
  }

  changeFilter(searchingString: string): void {
    this.store.dispatch(homesActions.setSearchingString({searchingString}));
  }
}
