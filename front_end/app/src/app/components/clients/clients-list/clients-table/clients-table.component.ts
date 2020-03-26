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
  constructor() { }

  ngOnInit(): void {
  }

  onDeleteButton(id: number | string): void {
    this.clientDeleteEvent.emit(id);
  }

  onProfileButton(id: number | string): void {
    this.clientProfileEvent.emit(id);
  }

}
