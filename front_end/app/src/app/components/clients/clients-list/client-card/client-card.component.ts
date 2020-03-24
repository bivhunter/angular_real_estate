import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/models/client/client';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit {

  @Input() client: Client;
  @Output() clientDeleteEvent: EventEmitter<number | string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteButton(): void {
    this.clientDeleteEvent.emit(this.client.id);
  }

}
