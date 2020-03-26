import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/models/client/client';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {

  @Input() clients: Client[];
  @Output() clientDeleteEvent: EventEmitter<number | string> = new EventEmitter();
  @Output() clientProfileEvent: EventEmitter<number | string> = new EventEmitter();
  @Output() clientsSortEvent: EventEmitter<string> = new EventEmitter();


  sortMethod: string;

  constructor() { }

  ngOnInit(): void {
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
    this.clientsSortEvent.emit(this.sortMethod);
  }

  onNameClick(): void {
    if (this.sortMethod === 'name_up') {
      this.sortMethod = 'name_down';
    } else {
      this.sortMethod = 'name_up';
    }
    this.clientsSortEvent.emit(this.sortMethod);
  }

}
