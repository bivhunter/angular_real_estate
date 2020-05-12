import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Home } from '../model/home';
import { Observable } from 'rxjs';
import { HomesService } from './homes.service';
import { State } from 'src/app/store/reducers/index';
import { Store } from '@ngrx/store';
import * as homesSelector from 'src/app/store/selectors/homes.selector';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HomesResolverService implements Resolve<Home[]> {

  constructor(
    private homesService: HomesService,
    private store: Store<State>
  ) { }

  resolve(): Observable<Home[]> {
    return this.store.select(homesSelector.getHomes).pipe(take(1));
  }
}
