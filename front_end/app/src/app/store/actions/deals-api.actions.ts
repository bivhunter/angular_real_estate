import { createAction, props } from '@ngrx/store';
import { TViewMode } from 'src/app/modules/shared/types/types';
import { Deal } from 'src/app/modules/deal/model/deal';

export const setViewModeSuccess = createAction(
  '[DealsApi] Set View Mode Success',
  props<{ viewMode: TViewMode }>()
);

export const getDealsSuccess = createAction(
  '[DealsApi] Get Deals Success',
  props<{ deals: Deal[] }>()
);

export const addDealSuccess = createAction(
  '[DealsApi] Add Deal Success',
  props<{ deal: Deal }>()
);


