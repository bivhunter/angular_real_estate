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

export interface State {
  dealState: dealsReducer.State;
}

const initState: State = {
  dealState: dealsReducer.initState
};

export const reducers: ActionReducerMap<State> = {
  dealState: dealsReducer.dealsReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
