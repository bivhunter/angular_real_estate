import { Component, OnInit, OnDestroy } from '@angular/core';
import { Deal } from '../../model/deal';
import { Observable, Subscription } from 'rxjs';
import { TDealsSortingMethod } from 'src/app/modules/shared/types/types';
import { DealsFilteringService } from 'src/app/modules/shared/services/deals-filtering.service';
import { DealsSortingService } from '../../services/deals-sorting.service';
import { DealsService } from 'src/app/modules/shared/services/deals.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit, OnDestroy {

  deals: Deal[] = [];
  filteredDeals: Deal[] = [];
  isDataReady = false;


  // observable and subscription for dealsUpdate
  private updateDealsListEvent: Observable<any>;
  private updateDealsListEventSubscribtion: Subscription;

  // observable and subscription for sorting
  private changingSortingMethodEvent: Observable<TDealsSortingMethod>;
  private changingStoringMethodSubscription: Subscription;
  sortingMethod: TDealsSortingMethod;

  // observable and subscription for filtering
  private changingFilterEvent: Observable<string>;
  private changingFilterSubscription: Subscription;
  private filterString = '';

  constructor(
    private dealsService: DealsService,
    private dealsSortingService: DealsSortingService,
    private dealsFilteringService: DealsFilteringService
  ) { }

  ngOnInit(): void {
    this.initSubscribtion();
    this.getDeals();
  }

  ngOnDestroy(): void {
    this.updateDealsListEventSubscribtion.unsubscribe();
    this.changingStoringMethodSubscription.unsubscribe();
    this.changingFilterSubscription.unsubscribe();
  }

  private getDeals(): void {
    this.dealsService.getDeals().subscribe(
      (dealsList) => this.getDealsHandler(dealsList),
      (error) => console.log(error)
    );
  }

  private getDealsHandler(dealsList: Deal[]) {
    this.deals = dealsList;
    this.isDataReady = true;
    this.filteredDeals = this.filterDeals(this.deals);
    this.filteredDeals = this.sortDeals(this.filteredDeals);
  }

  private sortDeals(deals: Deal[]): Deal[] {
    return this.dealsSortingService.sortDeals(deals, this.sortingMethod);
  }

  private filterDeals(deals: Deal[]): Deal[] {
    return this.dealsFilteringService.filterDeals(this.deals, this.filterString);
  }

  private initSubscribtion(): void {
    // updateDeals subscribe
    this.updateDealsListEvent = this.dealsService.getDealsListChangesEvent();
    this.updateDealsListEventSubscribtion = this.updateDealsListEvent
      .subscribe(() => this.getDeals());

      // sorting subscrib
    this.changingSortingMethodEvent = this.dealsSortingService
      .getChangingDealsSortingMethodEvent();
    this.changingStoringMethodSubscription =
      this.changingSortingMethodEvent.subscribe(
        (method) => {
          this.sortingMethod = method;
          this.filteredDeals = this.sortDeals(this.filteredDeals);
        }
      );
    //  filtering subscribe
    this.changingFilterEvent = this.dealsFilteringService.getChangingFilterEvent();
    this.changingFilterSubscription = this.changingFilterEvent.subscribe(
      filterString => {
        this.filterString = filterString;
        this.filteredDeals = this.filterDeals(this.deals);
      }
    );
  }
}




