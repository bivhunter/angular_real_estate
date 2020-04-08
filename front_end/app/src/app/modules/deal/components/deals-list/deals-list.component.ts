import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Deal } from '../../model/deal';
import { TViewMode, TDealsSortingMethod, TDealsSortingField } from 'src/app/modules/shared/types/types';
import { Observable, Subscription } from 'rxjs';
import { DealsViewService } from '../../services/deals-view.service';
import { DealsSortingService } from '../../services/deals-sorting.service';

@Component({
  selector: 'app-deals-list',
  templateUrl: './deals-list.component.html',
  styleUrls: ['./deals-list.component.css']
})
export class DealsListComponent implements OnInit, OnDestroy {

  @Input() deals: Deal[];
  viewMode: TViewMode;
  sortingMethod: TDealsSortingMethod;

  private viewModeBehaviorSubject: Observable<TViewMode>;
  private viewModeSubscribtion: Subscription;

  private changingSortingMethodEvent: Observable<TDealsSortingMethod>;
  private changingSortingMethodSubscription: Subscription;

  constructor(
    private dealsViewService: DealsViewService,
    private dealsSortingService: DealsSortingService
  ) { }

  ngOnInit(): void {
    this.initSubscribtion();
  }

  ngOnDestroy() {
    this.viewModeSubscribtion.unsubscribe();
    this.changingSortingMethodSubscription.unsubscribe();
  }

  // set new sorting method
  changeSortingMethod(field: TDealsSortingField): void {
    this.dealsSortingService.selectDealsSortingMethod(field);
  }

  private initSubscribtion(): void {
    // subscribe for changing view
    this.viewModeSubscribtion = this.dealsViewService
    .getViewModeBehaviorSubject()
    .subscribe(
      (viewMode) => {
        this.viewMode = viewMode;
      }
    );

    // subscribe for changing sorting method
    this.changingSortingMethodSubscription = this.dealsSortingService
      .getChangingDealsSortingMethodEvent()
      .subscribe(
        (method) => this.sortingMethod = method
      );

  }

}
