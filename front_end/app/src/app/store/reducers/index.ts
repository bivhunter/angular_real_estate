import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  on,
  createReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as dealsReducer from '../reducers/deals.reducer';
import * as homesReducer from '../reducers/homes.reducer';

export interface State {
  dealsState: dealsReducer.State;
  homesState: homesReducer.State;
}

const initState: State = {
  dealsState: dealsReducer.initState,
  homesState: homesReducer.initState
};

export const reducers: ActionReducerMap<State> = {
  dealsState: dealsReducer.dealsReducer,
  homesState: homesReducer.homesReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
