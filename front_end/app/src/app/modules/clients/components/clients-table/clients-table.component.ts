import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { ClientService } from '../../clients.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit, OnDestroy {

  @Input() clients: Client[];
  @Output() clientDeleteEvent: EventEmitter<number | string> = new EventEmitter();
  @Output() clientProfileEvent: EventEmitter<number | string> = new EventEmitter();

  sortMethod: string;
  sortMethodSubject: Observable<string>;
  sortMethodSubscribtion: Subscription;


  constructor(
    private clientsService: ClientService
  ) { }

  ngOnInit(): void {
    this.initSubscribtions();
  }

  ngOnDestroy(): void {
    this.sortMethodSubscribtion.unsubscribe();
  }

  onDeleteButton(id: number | string): void {
    this.clientDeleteEvent.emit(id);
  }

  onProfileButton(id: number | string): void {
    this.clientProfileEvent.emit(id);
  }

  onSurnameClick(): void {
    if (this.sortMethod === 'surname_up') {
      this.sortMethod = 'surname_down';
    } else {
      this.sortMethod = 'surname_up';
    }
    this.clientsService.sortClients(this.sortMethod);
  }

  onNameClick(): void {
    if (this.sortMethod === 'name_up') {
      this.sortMethod = 'name_down';
    } else {
      this.sortMethod = 'name_up';
    }
    this.clientsService.sortClients(this.sortMethod);
  }

  private initSubscribtions(): void {
    this.sortMethodSubject = this.clientsService.getClientsSortMethodSubject();
    this.sortMethodSubscribtion = this.sortMethodSubject.subscribe(
      (sortMethod) => this.sortMethod = sortMethod
    );
  }

}
