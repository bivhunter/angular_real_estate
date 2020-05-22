import { TViewMode, ISortingConf } from 'src/app/modules/shared/types/types';
import { createReducer, on } from '@ngrx/store';
import * as homesAction from '../actions/homes.action';
import * as homesApiAction from '../actions/homes-api.actions';
import { Home } from 'src/app/modules/homes/model/home';



export interface State {
    homes: Home[];
    viewMode: TViewMode;
    sortingConf: ISortingConf;
    searchingString: string;
}

export const initState: State = {
    homes: null,
    viewMode: localStorage.getItem('viewHomesMode') as TViewMode || 'cards',
    sortingConf: {
        active: 'home',
        direction: 'asc'
    },
    searchingString: ''
};

export const homesReducer = createReducer(
    initState,
    on(homesAction.setSortingConf, (state, {sortingConf}) => {
        return {
            ...state,
            sortingConf
        };
    }),
    on(homesApiAction.setViewModeSuccess, (state, {viewMode}) => ({...state, viewMode})),
    on(homesAction.setSearchingString, (state, {searchingString}) => ({...state, searchingString})),
    on(homesApiAction.getHomesSuccess, (state, {homes}) => {
        return {...state, homes};
    }),
    on(homesApiAction.addHomeSuccess, (state, {home}) => {
        return {
            ...state,
            homes: [...state.homes, home]
        };
    }),
     on(homesApiAction.updateHomeSuccess, (state, {home}) => {
        return {
            ...state,
            homes: state.homes.map(homeItem => {
                if (homeItem.id === home.id) {
                    return home;
                }
                return homeItem;
            })
        };
    }),
    on(homesApiAction.deleteHomeSuccess, (state, {id}) => {
        return {
            ...state,
            homes: state.homes.filter(homeItem => homeItem.id !== id)
        };
    }),

);


// for selectors
export const getViewMode = (state: State) => state.viewMode;
export const getSortingConf = (state: State) => state.sortingConf;
export const getSearchingString = (state: State) => state.searchingString;
export const getHomes = (state: State) => state.homes;

// additional function

