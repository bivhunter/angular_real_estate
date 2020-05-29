import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import * as dealsReducer from '../reducers/deals.reducer';
import * as homesReducer from '../reducers/homes.reducer';
import * as clientsReducer from './clients.reducer';
import * as usersReducer from './user.reducer';

export interface State {
  dealsState: dealsReducer.State;
  homesState: homesReducer.State;
  clientsState: clientsReducer.State;
  userState: usersReducer.State;
}

const initState: State = {
  dealsState: dealsReducer.initState,
  homesState: homesReducer.initState,
  clientsState: clientsReducer.initState,
  userState: usersReducer.initState
};

export const reducers: ActionReducerMap<State> = {
  dealsState: dealsReducer.dealsReducer,
  homesState: homesReducer.homesReducer,
  clientsState: clientsReducer.clientsReducer,
  userState: usersReducer.usersReducer,
};

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action.type === '[App] Logout') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [clearState];