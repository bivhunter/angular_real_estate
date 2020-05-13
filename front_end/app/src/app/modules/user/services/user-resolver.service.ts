import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as userSelectors from 'src/app/store/selectors/user.selector';
import * as userApiActions from 'src/app/store/actions/user-api.actions';
import { take, switchMap, filter } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {

  constructor(
    private store: Store,
    private actions: Actions
  ) { }

  resolve(): Observable<User> {
    return this.store.select(userSelectors.getUser).pipe(
      filter(user => !!user),
      take(1)
    );
  }
}
