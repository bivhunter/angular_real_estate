import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Home } from '../../model/home';
import { Router } from '@angular/router';
import { HomesService } from './../../homes.service';
import { HomesSortService } from '../../services/homes-sort.service';
import { THomesSortingField, THomesSortingMethod } from 'src/app/modules/shared/types/types';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-homes-table',
  templateUrl: './homes-table.component.html',
  styleUrls: ['./homes-table.component.css']
})
export class HomesTableComponent implements OnInit, OnDestroy {

  @Input() homes: Home[];
  changingSortingMethodEvent: Observable<THomesSortingMethod>;
  changingStoringMethodSubscription: Subscription;
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

  onHomeClick(): void {

  }

  onStreetClick(): void {

  }

  setSortingField(field: THomesSortingField) {
    this.homesSortService.selectHomesSortingMethod(field);
  }

  onDetailsButton(id: string | number): void {
    this.router.navigateByUrl(`homes/details/${id}`);
  }

  onDeleteButton(id: string | number): void {
    this.homesService.deleteHome(id).subscribe();
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
