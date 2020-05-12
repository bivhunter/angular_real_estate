import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as homesAction from '../actions/homes.action';
import * as homesApiAction from '../actions/homes-api.actions';
import { switchMap, map } from 'rxjs/operators';
import { HomesService } from 'src/app/modules/homes/services/homes.service';

@Injectable()
export class HomesEffects {

  loadHomes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.loadHomes),
      switchMap(() => this.homesService.getHomes()),
      map(
        homes => {
          console.log(homes);
          return homesApiAction.getHomesSuccess({homes});
        }
      )
    );
  });

  viewMode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.setViewMode),
      map(
        ({viewMode}) => {
          localStorage.setItem('viewHomesMode', viewMode);
          return homesApiAction.setViewModeSuccess({viewMode});
        }
      )
    );
  });

  addHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.addHome),
      switchMap(({home}) => {
        console.log(home);
        return this.homesService.addHome(home);
      }),
      map(home => {
        console.log(home);
        return homesApiAction.addHomeSuccess({home});
      })
    );
  });

  updateHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.updateHome),
      switchMap(({home}) => {
        console.log(home);
        return this.homesService.updateHome(home);
      }),
      map(home => {
        console.log(home);
        return homesApiAction.updateHomeSuccess({home});
      })
    );
  });

  deleteHome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(homesAction.deleteHome),
      switchMap(({id}) => {
        return this.homesService.deleteHome(id);
      }),
      map(home => {
        return homesApiAction.deleteHomeSuccess({id: home.id});
      })
    );
  });

  constructor(
    private actions$: Actions,
    private homesService: HomesService
  ) {}
}
