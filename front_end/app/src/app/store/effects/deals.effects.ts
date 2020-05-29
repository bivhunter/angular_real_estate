import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as dealsAction from '../actions/deals.action';
import * as dealsApiAction from '../actions/deals-api.actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { DealsService } from 'src/app/modules/deal/services/deals.service';
import { ProgressBarService } from 'src/app/modules/shared/services/progress-bar.service';
import { Store } from '@ngrx/store';
import * as appActions from '../actions/app.actions';

@Injectable()
export class DealsEffects {

  loadDeals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dealsAction.loadDeals),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(() => this.dealsService.getDeals()),
      map(
        deals => {
          this.progressBarService.closeProgressBar();
          return dealsApiAction.getDealsSuccess({deals});
        }
      )
    );
  });

  addDeal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dealsAction.addDeal),
      tap(() => this.progressBarService.openProgressBar()),
      switchMap(({deal}) => {
        return this.dealsService.addDeal(deal);
      }),
      map(deal => {
        this.store.dispatch(appActions.initStore());
        this.progressBarService.closeProgressBar();
        return dealsApiAction.addDealSuccess();
      })
    );
  });

  viewMode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dealsAction.setViewMode),
      map(
        ({viewMode}) => {
          localStorage.setItem('viewDealsMode', viewMode);
          return dealsApiAction.setViewModeSuccess({viewMode});
        }
      )
    );
  });

  constructor(
    private actions$: Actions,
    private dealsService: DealsService,
    private progressBarService: ProgressBarService,
    private store: Store,
  ) {}
}
