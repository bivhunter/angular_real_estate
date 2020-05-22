import { Component, OnInit } from '@angular/core';
import { Home } from '../../model/home';
import { Observable } from 'rxjs';

import * as homesSelector from 'src/app/store/selectors/homes.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {


  homes$: Observable<Home[]>;
  filteredHomes$: Observable<Home[]>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  private getFromStore(): void {
    this.homes$ = this.store.select(homesSelector.getHomes);
    this.filteredHomes$ = this.store.select(homesSelector.getFilteredHomes);
  }
}
