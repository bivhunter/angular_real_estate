import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Home } from '../../model/home';
import { Router } from '@angular/router';
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

  viewModeBehaviorSubject: Observable<TViewMode>;
  viewModeSubscribtion: Subscription;

  changingSortingMethodEvent: Observable<THomesSortingMethod>;
  changingSortingMethodSubscription: Subscription;

  constructor(
    private router: Router,
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

  onHomeProfileEvent(id: number | string): void {
    this.router.navigateByUrl('homes/details/' + id);
  }

  changeSortingMethod(field: THomesSortingField): void {
    this.homesSortService.selectHomesSortingMethod(field);
  }

  private initSubscribtion(): void {
    this.viewModeSubscribtion = this.homesViewService
    .getViewModeBehaviorSubject()
    .subscribe(
      (viewMode) => {
        console.log(viewMode);
        this.viewMode = viewMode;
      }
    );

    this.changingSortingMethodSubscription = this.homesSortService
      .getChangingHomesSortingMethodEvent()
      .subscribe(
        (method) => this.sortingMethod = method
      );

  }

}
