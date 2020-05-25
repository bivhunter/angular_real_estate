import { Component, OnInit } from '@angular/core';
import { Deal } from '../../model/deal';
import { Observable } from 'rxjs';

import * as dealsSelector from 'src/app/store/selectors/deals.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {

  deals$: Observable<Deal[]>;
  filteredDeals$: Observable<Deal[]>;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getFromStore();
  }

  private getFromStore(): void {
    this.filteredDeals$ = this.store.select(dealsSelector.getFilteredDeals);
    this.deals$ = this.store.select(dealsSelector.getDeals);
  }
}




