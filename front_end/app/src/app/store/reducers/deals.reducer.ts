import { Deal } from 'src/app/modules/deal/model/deal';
import { TDealsSortingMethod, TViewMode } from 'src/app/modules/shared/types/types';
import { createReducer, on } from '@ngrx/store';
import * as dealsAction from '../actions/deals.action';
import * as dealsApiAction from '../actions/deals-api.actions';
import { selectDealsSortingMethod } from '../functions/sorting-functions';

export interface State {
    deals: Deal[];
    viewMode: TViewMode;
    sortingMethod: TDealsSortingMethod;
    searchingString: string;
}

export const initState: State = {
    deals: null,
    viewMode: localStorage.getItem('viewDealsMode') as TViewMode || 'cards',
    sortingMethod: 'DATE_UP',
    searchingString: ''
};

export const dealsReducer = createReducer(
    initState,
    on(dealsAction.setSortingField, (state, {sortingMethodField}) => {
        return {
            ...state,
            sortingMethod: selectDealsSortingMethod(state.sortingMethod, sortingMethodField)
        };
    }),
    on(dealsApiAction.setViewModeSuccess, (state, {viewMode}) => ({...state, viewMode})),
    on(dealsApiAction.getDealsSuccess, (state, {deals}) => {
        return {...state, deals};
    }),
    on(dealsAction.setSearchingString, (state, {searchingString}) => ({...state, searchingString})),
);


// for selectors
export const getViewMode = (state: State) => state.viewMode;
export const getSortingMethod = (state: State) => state.sortingMethod;
export const getSearchingString = (state: State) => state.searchingString;
export const getDeals = (state: State) => state.deals;

// additional function

