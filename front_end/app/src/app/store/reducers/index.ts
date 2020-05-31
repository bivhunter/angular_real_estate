import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';

import * as dealsReducer from '../reducers/deals.reducer';
import * as homesReducer from '../reducers/homes.reducer';
import * as clientsReducer from './clients.reducer';
import * as usersReducer from './user.reducer';
import * as appApiActions from '../actions/app-api.actions'

export interface State {
  dealsState: dealsReducer.State;
  homesState: homesReducer.State;
  clientsState: clientsReducer.State;
  userState: usersReducer.State;
  isInitStore: boolean;
}

const initState: State = {
  dealsState: dealsReducer.initState,
  homesState: homesReducer.initState,
  clientsState: clientsReducer.initState,
  userState: usersReducer.initState,
  isInitStore: false
};

const appReducer = createReducer(
  false,
  on(appApiActions.initStoreSuccess, (state) => {
      return true;
  }),
);

export const reducers: ActionReducerMap<State> = {
  dealsState: dealsReducer.dealsReducer,
  homesState: homesReducer.homesReducer,
  clientsState: clientsReducer.clientsReducer,
  userState: usersReducer.usersReducer,
  isInitStore: appReducer
};

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action.type === '[App] Logout') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const getInitStoreStatus = (state: State) => state.isInitStore;

export const metaReducers: MetaReducer<State>[] = [clearState];
