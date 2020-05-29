import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userAction from '../actions/user.actions';
import * as userApiAction from '../actions/user-api.actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/modules/user/services/user.service';
import { User } from 'src/app/modules/user/model/user';
import { ProgressBarService } from 'src/app/modules/shared/services/progress-bar.service';

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userAction.getUser),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(() => this.usersService.getUser()),
      map(
        newUser => {
          const user = new User(newUser);
          this.progressBarService.closeProgressBar();
          return userApiAction.getUserSuccess({user});
        }
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userAction.updateUser),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(({user}) => {
        return this.usersService.updateUser(user);
      }),
      map(newUser => {
        const user = new User(newUser);
        this.progressBarService.closeProgressBar();
        return userApiAction.updateUserSuccess({user});
      })
    );
  });

  constructor(
    private actions$: Actions,
    private usersService: UserService,
    private progressBarService: ProgressBarService
  ) {}
}
