import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../model/home';
import { Router } from '@angular/router';
import { HomesService } from './../../homes.service';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  @Input() home: Home;

  constructor(
    private router: Router,
    private homesService: HomesService
  ) { }

  ngOnInit(): void {

  }

  onDeleteButton(id: string | number): void {
    this.homesService.deleteHome(id)
      .subscribe();
  }

  onDetailsButton(id: string | number) {
    this.router.navigateByUrl(`homes/details/${id}`);
  }
}
