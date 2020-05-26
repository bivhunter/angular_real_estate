import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../model/home';
import { HomesPopupService } from '../../services/homes-popup.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  @Input() home: Home;

  constructor(
    private popup: HomesPopupService,
  ) { }

  ngOnInit(): void {

  }

  onDeleteButton(): void {
    this.popup.openDeleteHome(this.home);
  }

  onViewedClient(): void {
    this.popup.openClientsWhoViewed(this.home);
  }

  onAddClient(): void {
    this.popup.openAddingClientList(this.home);
  }
}
