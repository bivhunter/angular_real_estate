import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Deal } from '../../model/deal';
import { Observable, Subscription } from 'rxjs';
import { TDealsSortingMethod, TDealsSortingField } from 'src/app/modules/shared/types/types';
import { Router } from '@angular/router';
import { DealsService } from 'src/app/modules/shared/services/deals.service';
import { DealsSortingService } from '../../services/deals-sorting.service';

@Component({
  selector: 'app-deals-table',
  templateUrl: './deals-table.component.html',
  styleUrls: ['./deals-table.component.css']
})
export class DealsTableComponent implements OnInit, OnDestroy {

  @Input() deals: Deal[];

  private changingSortingMethodEvent: Observable<TDealsSortingMethod>;
  private changingStoringMethodSubscription: Subscription;
  sortingMethod: TDealsSortingMethod;

  constructor(
    private router: Router,
    private dealsService: DealsService,
    private dealsSortingService: DealsSortingService
  ) { }

  ngOnInit(): void {
    this.initSubscription();
  }

  ngOnDestroy(): void {
    this.changingStoringMethodSubscription.unsubscribe();
  }

  onHomeClick(id: string | number ): void {
    this.router.navigateByUrl(`homes/details/${id}`);
  }

  onClientClick(id: string | number ): void {
    this.router.navigateByUrl(`clients/profile/${id}`);
  }

   // show deal details
   onDealClick(id: string | number): void {
    this.router.navigateByUrl(`deals/details/${id}`);
  }

  setSortingField(field: TDealsSortingField) {
    this.dealsSortingService.selectDealsSortingMethod(field);
  }

  private initSubscription(): void {
    this.changingSortingMethodEvent = this.dealsSortingService
      .getChangingDealsSortingMethodEvent();
    this.changingStoringMethodSubscription =
      this.changingSortingMethodEvent.subscribe(
        (method) => this.sortingMethod = method
      );
  }

}
