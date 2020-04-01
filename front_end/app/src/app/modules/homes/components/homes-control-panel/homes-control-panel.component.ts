import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomesViewService } from '../../services/homes-view.service';
import { HomesFilterService } from './../../services/homes-filter.service';

@Component({
  selector: 'app-homes-control-panel',
  templateUrl: './homes-control-panel.component.html',
  styleUrls: ['./homes-control-panel.component.css']
})
export class HomesControlPanelComponent implements OnInit {

  isViewsMenu = false;
  searchString: string;

  constructor(
    private router: Router,
    private homesViewService: HomesViewService,
    private homesFilterService: HomesFilterService
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

  changeFilter(searchString: string): void {
    this.homesFilterService.changeFilter(searchString);
  }

}
