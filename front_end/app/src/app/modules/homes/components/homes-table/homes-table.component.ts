import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../model/home';
import { Router } from '@angular/router';
import { HomesService } from './../../homes.service';

@Component({
  selector: 'app-homes-table',
  templateUrl: './homes-table.component.html',
  styleUrls: ['./homes-table.component.css']
})
export class HomesTableComponent implements OnInit {

  @Input() homes: Home[];
  sortMethod: string;

  constructor(
    private router: Router,
    private homesService: HomesService
  ) { }

  ngOnInit(): void {
  }

  onHomeClick(): void {

  }

  onStreetClick(): void {

  }

  onDetailsButton(id: string | number): void {
    this.router.navigateByUrl(`homes/details/${id}`);
  }

  onDeleteButton(id: string | number): void {
    this.homesService.deleteHome(id).subscribe();
  }

}
