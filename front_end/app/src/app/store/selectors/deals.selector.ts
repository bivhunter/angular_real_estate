import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDeals from 'src/app/store/reducers/deals.reducer';
import { Deal } from 'src/app/modules/deal/model/deal';
import { sortDeals } from '../functions/sorting-functions';
import { filterDeals } from './../functions/filtered-functions';


export const getDealsState = createFeatureSelector<fromDeals.State>('dealState');


export const getViewMode = createSelector(
    getDealsState,
    fromDeals.getViewMode
);

export const getDeals = createSelector(
    getDealsState,
    fromDeals.getDeals
);

export const getSortingMethod = createSelector(
    getDealsState,
    fromDeals.getSortingMethod
);

export const getSearchingString = createSelector(
    getDealsState,
    fromDeals.getSearchingString
);



export const getSortedDeals = createSelector(
    getDeals,
    getSortingMethod,
    sortDeals
);

export const getFilteredDeals = createSelector(
    getSortedDeals,
    getSearchingString,
    filterDeals
);

export const getDeal = createSelector(
    getDeals,
    (deals: Deal[], id: number | string) => {
        const dealArr = deals.filter(deal => deal.id === +id);
        return dealArr[0];
    }
);
