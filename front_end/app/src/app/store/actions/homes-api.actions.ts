import { createAction, props } from '@ngrx/store';
import { TViewMode } from 'src/app/modules/shared/types/types';
import { Home } from 'src/app/modules/homes/model/home';

export const setViewModeSuccess = createAction(
  '[HomesApi] Set View Mode Success',
  props<{ viewMode: TViewMode }>()
);

export const getHomesSuccess = createAction(
  '[HomesApi] Get Homes Success',
  props<{ homes: Home[] }>()
);

export const addHomeSuccess = createAction(
  '[HomesApi] Add Home Success',
  props<{ home: Home }>()
);

export const deleteHomeSuccess = createAction(
  '[HomesApi] Delete Home Success',
  props<{ id: string | number }>()
);

export const updateHomeSuccess = createAction(
  '[HomesApi] Update Home Success',
  props<{ home: Home }>()
);


