import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TClientsSortingMethod } from 'src/app/modules/shared/types/types';
import { ClientsViewService } from './../../services/clients-view.service';
import { ClientsFilteringService } from './../../services/clients-filtering.service';

@Component({
  selector: 'app-clients-control-panel',
  templateUrl: './clients-control-panel.component.html',
  styleUrls: ['./clients-control-panel.component.css']
})
export class ClientsControlPanelComponent implements OnInit {

  isViewsMenu = false;

  constructor(
    private router: Router,
    private clientsViewService: ClientsViewService,
    private clientsFilteringService: ClientsFilteringService
  ) { }

  ngOnInit(): void {
  }

  onActivateCardView() {
    this.clientsViewService.setViewMode('cards');
    this.isViewsMenu = false;
  }

  onActivateListView() {
    this.clientsViewService.setViewMode('list');
    this.isViewsMenu = false;
  }

  changeFilter(searchString: string): void {
    this.clientsFilteringService.changeFilter(searchString);
  }

  onAddButtonClick(): void {
    this.router.navigateByUrl('clients/adding');
  }

}
