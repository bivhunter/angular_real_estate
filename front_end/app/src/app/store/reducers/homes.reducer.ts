import { THomesSortingMethod, TViewMode } from 'src/app/modules/shared/types/types';
import { createReducer, on } from '@ngrx/store';
import * as homesAction from '../actions/homes.action';
import * as homesApiAction from '../actions/homes-api.actions';
import { selectHomesSortingMethod } from '../functions/sorting-functions';
import { Home } from 'src/app/modules/homes/model/home';



export interface State {
    homes: Home[];
    viewMode: TViewMode;
    sortingMethod: THomesSortingMethod;
    searchingString: string;
}

export const initState: State = {
    homes: [],
    viewMode: localStorage.getItem('viewHomesMode') as TViewMode || 'cards',
    sortingMethod: 'HOME_UP',
    searchingString: ''
};

export const homesReducer = createReducer(
    initState,
    on(homesAction.setSortingField, (state, {sortingMethodField}) => {
        return {
            ...state,
            sortingMethod: selectHomesSortingMethod(state.sortingMethod, sortingMethodField)
        };
    }),
    on(homesApiAction.setViewModeSuccess, (state, {viewMode}) => ({...state, viewMode})),
    on(homesApiAction.getHomesSuccess, (state, {homes}) => {
        return {...state, homes};
    }),
    on(homesAction.setSearchingString, (state, {searchingString}) => ({...state, searchingString})),
    on(homesApiAction.addHomeSuccess, (state, {home}) => {
        console.log(state, home);
        return {
            ...state,
            homes: [...state.homes, home]
        };
    })
);


// for selectors
export const getViewMode = (state: State) => state.viewMode;
export const getSortingMethod = (state: State) => state.sortingMethod;
export const getSearchingString = (state: State) => state.searchingString;
export const getHomes = (state: State) => state.homes;

// additional function

