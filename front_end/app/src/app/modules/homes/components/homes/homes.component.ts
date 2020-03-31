import { Component, OnInit, OnDestroy } from '@angular/core';
import { Home } from '../../model/home';
import { HomesService } from '../../homes.service';
import { Observable, Subscription } from 'rxjs';
import { THomesSortingMethod } from 'src/app/modules/shared/types/types';
import { HomesSortService } from '../../services/homes-sort.service';
import { HomesFilterService } from './../../services/homes-filter.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit, OnDestroy {


  homes: Home[] = [];
  filteredHomes: Home[] = [];


  // observable and subscription for homesUpdate
  private updateHomesListEvent: Observable<any>;
  private updateHomesListEventSubscribtion: Subscription;

  // observable and subscription for sorting
  private changingSortingMethodEvent: Observable<THomesSortingMethod>;
  private changingStoringMethodSubscription: Subscription;
  sortingMethod: THomesSortingMethod;

  // observable and subscription for filtering
  private changingFilterEvent: Observable<string>;
  private changingFilterSubscription: Subscription;
  private filterString = '';

  constructor(
    private homesService: HomesService,
    private homesSortService: HomesSortService,
    private homesFilterService: HomesFilterService
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
      (homesList) => this.getHomesHandler(homesList),
      (error) => console.log(error)
    );
  }

  private getHomesHandler(homesList: Home[]) {
    this.homes = homesList;
    this.filteredHomes = this.filterHomes(this.homes);
    this.filteredHomes = this.sortHomes(this.filteredHomes);
  }

  private sortHomes(homes: Home[]): Home[] {
    return this.homesSortService.sortHomes(homes, this.sortingMethod);
  }

  private filterHomes(homes: Home[]): Home[] {
    return this.homesFilterService.filterHomes(this.homes, this.filterString);
  }

  private initSubscribtion(): void {
    // updateHomes subscribe
    this.updateHomesListEvent = this.homesService.getHomesListChangesEvent();
    this.updateHomesListEventSubscribtion = this.updateHomesListEvent
      .subscribe(() => this.getHomes());

      // sorting subscrib
    this.changingSortingMethodEvent = this.homesSortService
      .getChangingHomesSortingMethodEvent();
    this.changingStoringMethodSubscription =
      this.changingSortingMethodEvent.subscribe(
        (method) => {
          this.sortingMethod = method;
          this.filteredHomes = this.sortHomes(this.filteredHomes);
        }
      );
    //  filtering subscribe
    this.changingFilterEvent = this.homesFilterService.getChangingFilterEvent();
    this.changingFilterSubscription = this.changingFilterEvent.subscribe(
      filterString => {
        this.filterString = filterString;
        this.filteredHomes = this.filterHomes(this.homes);
      }
    );
  }
}
