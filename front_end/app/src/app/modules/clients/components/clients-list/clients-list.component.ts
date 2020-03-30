import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  @Input() clients: Client[];
  @Input() viewMode: string;
  @Output() clientDeleteEvent: EventEmitter<string | number> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClientDeleteEvent(id: number | string): void {
    this.clientDeleteEvent.emit(id);
  }

  onClientProfileEvent(id: number | string): void {
    this.router.navigateByUrl('clients/profile/' + id);
  }

}
