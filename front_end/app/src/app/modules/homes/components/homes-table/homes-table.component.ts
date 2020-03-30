import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../model/home';

@Component({
  selector: 'app-homes-table',
  templateUrl: './homes-table.component.html',
  styleUrls: ['./homes-table.component.css']
})
export class HomesTableComponent implements OnInit {

  @Input() homes: Home[];
  sortMethod: string;

  constructor() { }

  ngOnInit(): void {
  }

  onHomeClick(): void {

  }

  onStreetClick(): void {

  }

  onDetailsButton(id: string | number): void {

  }

  onDeleteButton(id: string | number): void {

  }

}
