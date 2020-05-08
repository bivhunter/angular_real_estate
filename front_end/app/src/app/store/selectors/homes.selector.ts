import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHomes from 'src/app/store/reducers/homes.reducer';
import { sortHomes } from '../functions/sorting-functions';
import { filterHomes } from '../functions/filtered-functions';
import { Home } from 'src/app/modules/homes/model/home';


export const getHomesState = createFeatureSelector<fromHomes.State>('homeState');


export const getViewMode = createSelector(
    getHomesState,
    fromHomes.getViewMode
);

export const getHomes = createSelector(
    getHomesState,
    fromHomes.getHomes
);

export const getSortingMethod = createSelector(
    getHomesState,
    fromHomes.getSortingMethod
);

export const getSearchingString = createSelector(
    getHomesState,
    fromHomes.getSearchingString
);



export const getSortedHomes = createSelector(
    getHomes,
    getSortingMethod,
    sortHomes
);

export const getFilteredHomes = createSelector(
    getSortedHomes,
    getSearchingString,
    filterHomes
);

export const getHome = createSelector(
    getHomes,
    (homes: Home[], id: number | string) => {
        const homeArr = homes.filter(home => home.id === +id);
        return homeArr[0];
    }
);
