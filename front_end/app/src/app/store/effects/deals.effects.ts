import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as dealsAction from '../actions/deals.action';
import * as dealsApiAction from '../actions/deals-api.actions';
import { switchMap, map } from 'rxjs/operators';
import { DealsService } from 'src/app/modules/deal/services/deals.service';
import { of } from 'rxjs';
import { InitDataService } from './../../modules/shared/services/init-data.service';

@Injectable()
export class DealsEffects {

  loadDeals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dealsAction.loadDeals),
      switchMap(() => this.dealsService.getDeals()),
      map(
        deals => {
          return dealsApiAction.getDealsSuccess({deals});
        }
      )
    );
  });

  addDeal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(dealsAction.addDeal),
      switchMap(({deal}) => {
        return this.dealsService.addDeal(deal);
      }),
      map(deal => {
        this.initDataService.initData();
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
    private initDataService: InitDataService
  ) {}
}
