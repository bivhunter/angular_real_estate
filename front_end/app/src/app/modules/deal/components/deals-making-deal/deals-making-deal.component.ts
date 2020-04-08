import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/modules/clients/model/client';
import { Home } from 'src/app/modules/homes/model/home';

@Component({
  selector: 'app-deals-making-deal',
  templateUrl: './deals-making-deal.component.html',
  styleUrls: ['./deals-making-deal.component.css']
})
export class DealsMakingDealComponent implements OnInit {

  @Input() client: Client;
  @Input() home: Home;

  @Output() submitEvent: EventEmitter<Home> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();
  @Output() backEvent: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  getCurrentDate(): Date {
    return new Date();
  }

}
