import { Component, OnInit } from '@angular/core';
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

  viewMode: TViewMode;

  constructor(
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
  }

  onActivateListView() {
    this.viewMode = 'list';
    this.store.dispatch(clientsActions.setViewMode({viewMode: 'list'}));
  }

  changeFilter(searchingString: string): void {
    this.store.dispatch(clientsActions.setSearchingString({searchingString}));
  }
}
