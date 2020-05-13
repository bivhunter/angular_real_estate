import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as clientsActions from 'src/app/store/actions/clients.action';


@Component({
  selector: 'app-clients-control-panel',
  templateUrl: './clients-control-panel.component.html',
  styleUrls: ['./clients-control-panel.component.css']
})
export class ClientsControlPanelComponent implements OnInit {

  isViewsMenu = false;

  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.changeFilter('');
  }

  onActivateCardView() {
    this.store.dispatch(clientsActions.setViewMode({viewMode: 'cards'}));
    this.isViewsMenu = false;
  }

  onActivateListView() {
    this.store.dispatch(clientsActions.setViewMode({viewMode: 'list'}));
    this.isViewsMenu = false;
  }

  changeFilter(searchingString: string): void {
    this.store.dispatch(clientsActions.setSearchingString({searchingString}));
  }

  onAddButtonClick(): void {
    this.router.navigateByUrl('clients/adding');
  }

}
