import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomesViewService } from '../../services/homes-view.service';

@Component({
  selector: 'app-homes-control-panel',
  templateUrl: './homes-control-panel.component.html',
  styleUrls: ['./homes-control-panel.component.css']
})
export class HomesControlPanelComponent implements OnInit {

  searchString: string;
  isSortMenu = false;
  isViewsMenu = false;
  viewMode: string;
  sortMethod: string;


  constructor(
    private router: Router,
    private homesViewService: HomesViewService
  ) { }

  ngOnInit(): void {
  }

  onAddButtonClick(): void {
    this.router.navigateByUrl('homes/adding');
  }

  onActivateCardView() {
    this.homesViewService.setViewMode('cards');
    this.isViewsMenu = false;
  }

  onActivateListView() {
    this.homesViewService.setViewMode('list');
    this.isViewsMenu = false;
  }

}
