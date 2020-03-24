import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/models/client/client';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  @Input() clients: Client[];
  @Input() viewMode: string;
  @Output() clientDeleteEvent: EventEmitter<string | number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClientDeleteEvent(id: number | string): void {
    this.clientDeleteEvent.emit(id);
  }

}
