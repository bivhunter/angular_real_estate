import { Component, OnInit, OnDestroy } from '@angular/core';
import { Home } from '../../model/home';
import { HomesService } from '../../homes.service';
import { Observable, Subscription } from 'rxjs';
import { THomesSortingMethod } from 'src/app/modules/shared/types/types';
import { HomesSortService } from '../../services/homes-sort.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit, OnDestroy {


  homes: Home[] = [];

  updateHomesListEvent: Observable<any>;
  updateHomesListEventSubscribtion: Subscription;

  changingSortingMethodEvent: Observable<THomesSortingMethod>;
  changingStoringMethodSubscription: Subscription;
  sortingMethod: THomesSortingMethod;


  constructor(
    private homesService: HomesService,
    private homesSortService: HomesSortService
  ) { }

  ngOnInit(): void {
    this.initSubscribtion();
    this.getHomes();
  }

  ngOnDestroy(): void {
    this.updateHomesListEventSubscribtion.unsubscribe();
    this.changingStoringMethodSubscription.unsubscribe();
  }

  private getHomes(): void {
    this.homesService.gethomes().subscribe(
      (homesList) => this.homes = [...homesList],
      (error) => console.log(error)
    );
  }

  private initSubscribtion(): void {
    this.updateHomesListEvent = this.homesService.getHomesListChangesEvent();
    this.updateHomesListEventSubscribtion = this.updateHomesListEvent
      .subscribe(() => this.getHomes());

    this.changingSortingMethodEvent = this.homesSortService
      .getChangingHomesSortingMethodEvent();
    this.changingStoringMethodSubscription =
      this.changingSortingMethodEvent.subscribe(
        (method) => this.sortingMethod = method
      );
  }
}
