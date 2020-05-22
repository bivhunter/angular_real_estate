import { Deal } from 'src/app/modules/deal/model/deal';
import { TViewMode, ISortingConf } from 'src/app/modules/shared/types/types';
import { createReducer, on } from '@ngrx/store';
import * as dealsAction from '../actions/deals.action';
import * as dealsApiAction from '../actions/deals-api.actions';

export interface State {
    deals: Deal[];
    viewMode: TViewMode;
    sortingConf: ISortingConf;
    searchingString: string;
}

export const initState: State = {
    deals: null,
    viewMode: localStorage.getItem('viewDealsMode') as TViewMode || 'cards',
    sortingConf: {
        active: 'date',
        direction: 'asc'
    },
    searchingString: ''
};

export const dealsReducer = createReducer(
    initState,
    on(dealsAction.setSortingConf, (state, {sortingConf}) => {
        return {
            ...state,
            sortingConf
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
export const getSortingConf = (state: State) => state.sortingConf;
export const getSearchingString = (state: State) => state.searchingString;
export const getDeals = (state: State) => state.deals;

// additional function

