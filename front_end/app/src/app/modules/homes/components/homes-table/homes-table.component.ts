import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Home } from '../../model/home';
import { Router } from '@angular/router';
import { HomesService } from '../../../shared/services/homes.service';
import { HomesSortService } from '../../services/homes-sort.service';
import { THomesSortingField, THomesSortingMethod } from 'src/app/modules/shared/types/types';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-homes-table',
  templateUrl: './homes-table.component.html',
  styleUrls: ['./homes-table.component.css']
})
export class HomesTableComponent implements OnInit, OnDestroy {

  homeForDelete: Home;
  isPopup = false;
  @Input() homes: Home[];
  private changingSortingMethodEvent: Observable<THomesSortingMethod>;
  private changingStoringMethodSubscription: Subscription;
  sortingMethod: THomesSortingMethod;

  constructor(
    private router: Router,
    private homesService: HomesService,
    private homesSortService: HomesSortService
  ) { }

  ngOnInit(): void {
    this.initSubscription();
  }

  ngOnDestroy(): void {
    this.changingStoringMethodSubscription.unsubscribe();
  }

  setSortingField(field: THomesSortingField) {
    this.homesSortService.selectHomesSortingMethod(field);
  }

  // show home details
  onDetailsButton(id: string | number): void {
    this.router.navigateByUrl(`homes/details/${id}`);
  }

  // show popup menu
  onDeleteButton(home: Home): void {
    this.homeForDelete = {...home};
    this.isPopup = true;
  }

  deleteHome(id: string | number): void {
    this.homesService.deleteHome(id).subscribe(
      () => this.isPopup = false
    );
  }

  private initSubscription(): void {
    this.changingSortingMethodEvent = this.homesSortService
      .getChangingHomesSortingMethodEvent();
    this.changingStoringMethodSubscription =
      this.changingSortingMethodEvent.subscribe(
        (method) => this.sortingMethod = method
      );
  }

}
