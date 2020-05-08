import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as dealsAction from '../actions/deals.action';
import * as dealsApiAction from '../actions/deals-api.actions';
import { switchMap, map } from 'rxjs/operators';
import { DealsService } from 'src/app/modules/deal/services/deals.service';
import { of } from 'rxjs';

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
        console.log(deal);
        return this.dealsService.addDeal(deal);
      }),
      switchMap(newDeal => this.dealsService.getDeal(newDeal.id)),
      map(deal => {
        console.log(deal);
        return dealsApiAction.addDealSuccess({deal});
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
    private dealsService: DealsService
  ) {}
}
