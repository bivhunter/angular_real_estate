import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Observable, Subscription } from 'rxjs';
import { TClientsSortingMethod, TClientsSortingField } from 'src/app/modules/shared/types/types';
import { ClientsSortingService } from './../../services/clients-sorting.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit, OnDestroy {

  @Input() clients: Client[];
  @Output() clientDeleteEvent: EventEmitter<number | string> = new EventEmitter();
  @Output() clientProfileEvent: EventEmitter<number | string> = new EventEmitter();

  sortingMethod: TClientsSortingMethod;
  private changingSortingMethodEvent: Observable<TClientsSortingMethod>;
  private changingSortingMethodSubscription: Subscription;


  constructor(
    private clientsSortingService: ClientsSortingService
  ) { }

  ngOnInit(): void {
    this.initSubscribtions();
  }

  ngOnDestroy(): void {
    this.changingSortingMethodSubscription.unsubscribe();
  }

  onDeleteButton(id: number | string): void {
    this.clientDeleteEvent.emit(id);
  }

  onProfileButton(id: number | string): void {
    this.clientProfileEvent.emit(id);
  }

  setSortingField(field: TClientsSortingField): void {
    this.clientsSortingService.selectClientsSortingMethod(field);
  }
  private initSubscribtions(): void {
    this.changingSortingMethodEvent = this.clientsSortingService.getChangingSortingMethodEvent();
    this.changingSortingMethodSubscription = this.changingSortingMethodEvent.subscribe(
      (sortMethod) => this.sortingMethod = sortMethod
    );
  }

}
