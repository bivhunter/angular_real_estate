import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DealsViewService } from '../../services/deals-view.service';

@Component({
  selector: 'app-deals-control-panel',
  templateUrl: './deals-control-panel.component.html',
  styleUrls: ['./deals-control-panel.component.css']
})
export class DealsControlPanelComponent implements OnInit {
  
  isViewsMenu = false;

  constructor(
    private router: Router,
    private dealsViewService: DealsViewService,
    private clientsFilteringService: ClientsFilteringService
  ) { }

  ngOnInit(): void {
  }

  onActivateCardView() {
    this.dealsViewService.setViewMode('cards');
    this.isViewsMenu = false;
  }

  onActivateListView() {
    this.dealsViewService.setViewMode('list');
    this.isViewsMenu = false;
  }

  changeFilter(searchString: string): void {
    this.clientsFilteringService.changeFilter(searchString);
  }

  onAddButtonClick(): void {
    this.router.navigateByUrl('clients/adding');
  }

}
