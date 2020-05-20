import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as clientsActions from 'src/app/store/actions/clients.action';
import * as clientsSelectors from 'src/app/store/selectors/clients.selector';
import { TViewMode } from 'src/app/modules/shared/types/types';


@Component({
  selector: 'app-clients-control-panel',
  templateUrl: './clients-control-panel.component.html',
  styleUrls: ['./clients-control-panel.component.css']
})
export class ClientsControlPanelComponent implements OnInit {

  isViewsMenu = false;
  viewMode: TViewMode;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.changeFilter('');
    this.store.select(clientsSelectors.getViewMode).subscribe(
      viewMode => this.viewMode = viewMode
    );
  }

  onActivateCardView() {
    this.viewMode = 'cards';
    this.store.dispatch(clientsActions.setViewMode({viewMode: 'cards'}));
    this.isViewsMenu = false;
  }

  onActivateListView() {
    this.viewMode = 'list';
    this.store.dispatch(clientsActions.setViewMode({viewMode: 'list'}));
    this.isViewsMenu = false;
  }

  changeFilter(searchingString: string): void {
    console.log('change', searchingString)
    this.store.dispatch(clientsActions.setSearchingString({searchingString}));
  }

  onAddButtonClick(): void {
    this.router.navigateByUrl('clients/adding');
  }

}
