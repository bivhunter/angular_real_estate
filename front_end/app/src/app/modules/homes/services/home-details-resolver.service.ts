import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Home } from '../model/home';
import { Observable } from 'rxjs';
import { HomesService } from './homes.service';

import { Store } from '@ngrx/store';
import * as homesSelector from 'src/app/store/selectors/homes.selector';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeDetailsResolverService implements Resolve<Home> {

  constructor(
    private homesService: HomesService,
    private store: Store
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Home> {
    const id = route.paramMap.get('id');
    return this.store.select(homesSelector.getHome, id).pipe(take(1));
  }
}
