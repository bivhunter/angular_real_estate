import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Client } from '../../model/client';

@Component({
  selector: 'app-clients-popup-deleting',
  templateUrl: './clients-popup-deleting.component.html',
  styleUrls: ['./clients-popup-deleting.component.css']
})
export class ClientsPopupDeletingComponent implements OnInit {

  @Input() client: Client;
  @Output() submitEvent: EventEmitter<number | string> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(id: number | string): void {
    this.submitEvent.emit(this.client.id);
  }

  onCancel(): void {
    this.cancelEvent.emit();
  }

}
