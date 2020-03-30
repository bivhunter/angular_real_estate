import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../model/home';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  @Input() home: Home;

  constructor() { }

  ngOnInit(): void {

  }

  onDeleteButton() {

  }

  onDetailsButton() {

  }
}
