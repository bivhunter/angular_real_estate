import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';
import { TViewMode, TClientsSortingMethod, TClientsSortingField } from 'src/app/modules/shared/types/types';
import { Observable, Subscription } from 'rxjs';
import { ClientsViewService } from '../../services/clients-view.service';
import { ClientsSortingService } from './../../services/clients-sorting.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, OnDestroy {

  @Input() clients: Client[];

  viewMode: TViewMode;
  private changingViewModeEvent: Observable<TViewMode>;
  private changingViewSubscription: Subscription;

  sortingMethod: TClientsSortingMethod;
  private changingSortingMethodEvent: Observable<TClientsSortingMethod>;
  private changingSortingMethodSubscription: Subscription;

  constructor(
    private router: Router,
    private clientsViewService: ClientsViewService,
    private clientsSortingService: ClientsSortingService
  ) { }

  ngOnInit(): void {
    this.initSubscribptions();
  }

  ngOnDestroy(): void {
    this.changingViewSubscription.unsubscribe();
    this.changingSortingMethodSubscription.unsubscribe();
  }

  // set new sorting method
  changeSortingMethod(field: TClientsSortingField): void {
    this.clientsSortingService.selectClientsSortingMethod(field);
  }

  onClientProfileEvent(id: number | string): void {
    this.router.navigateByUrl('clients/profile/' + id);
  }

  private initSubscribptions(): void {
    // viewMode subscribe
    this.changingViewModeEvent = this.clientsViewService.getViewModeBehaviorSubject();
    this.changingViewSubscription = this.changingViewModeEvent.subscribe(
      (viewMode) => this.viewMode = viewMode
    );

    // sortingMethod subscribe
    this.changingSortingMethodEvent = this.clientsSortingService.getChangingSortingMethodEvent();
    this.changingSortingMethodSubscription = this.changingSortingMethodEvent.subscribe(
      (method) => this.sortingMethod = method
    );
  }

}
