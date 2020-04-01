import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Home } from '../../model/home';
import { HomesViewService } from '../../services/homes-view.service';
import { Observable, Subscription } from 'rxjs';
import { TViewMode, THomesSortingMethod, THomesSortingField } from 'src/app/modules/shared/types/types';
import { HomesSortService } from '../../services/homes-sort.service';

@Component({
  selector: 'app-homes-list',
  templateUrl: './homes-list.component.html',
  styleUrls: ['./homes-list.component.css']
})
export class HomesListComponent implements OnInit, OnDestroy {

  @Input() homes: Home[];
  viewMode: TViewMode;
  sortingMethod: THomesSortingMethod;

  private viewModeBehaviorSubject: Observable<TViewMode>;
  private viewModeSubscribtion: Subscription;

  private changingSortingMethodEvent: Observable<THomesSortingMethod>;
  private changingSortingMethodSubscription: Subscription;

  constructor(
    private homesViewService: HomesViewService,
    private homesSortService: HomesSortService
  ) { }

  ngOnInit(): void {
    this.initSubscribtion();
  }

  ngOnDestroy() {
    this.viewModeSubscribtion.unsubscribe();
    this.changingSortingMethodSubscription.unsubscribe();
  }

  // set new sorting method
  changeSortingMethod(field: THomesSortingField): void {
    this.homesSortService.selectHomesSortingMethod(field);
  }

  private initSubscribtion(): void {
    // subscribe for changing view
    this.viewModeSubscribtion = this.homesViewService
    .getViewModeBehaviorSubject()
    .subscribe(
      (viewMode) => {
        this.viewMode = viewMode;
      }
    );

    // subscribe for changing sorting method
    this.changingSortingMethodSubscription = this.homesSortService
      .getChangingHomesSortingMethodEvent()
      .subscribe(
        (method) => this.sortingMethod = method
      );

  }

}
