import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userAction from '../actions/user.actions';
import * as userApiAction from '../actions/user-api.actions';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from 'src/app/modules/user/services/user.service';
import { User } from 'src/app/modules/user/model/user';

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userAction.getUser),
      switchMap(() => this.usersService.getUser()),
      map(
        newUser => {
          const user = new User(newUser);
          console.log(user);
          return userApiAction.getUserSuccess({user});
        }
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userAction.updateUser),
      switchMap(({user}) => {
        console.log(user);
        return this.usersService.updateUser(user);
      }),
      map(newUser => {
        const user = new User(newUser);
        return userApiAction.updateUserSuccess({user});
      })
    );
  });

  constructor(
    private actions$: Actions,
    private usersService: UserService
  ) {}
}
