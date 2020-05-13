import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDeals from 'src/app/store/reducers/deals.reducer';
import * as fromRoot from 'src/app/store/reducers/index';
import { Deal } from 'src/app/modules/deal/model/deal';
import { sortDeals } from '../functions/sorting-functions';
import { filterDeals } from './../functions/filtered-functions';


export const getDealsState = createFeatureSelector<fromRoot.State, fromDeals.State>('dealsState');


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
        if (!deals) {
            return null;
        }
        const dealArr = deals.filter(deal => deal.id === +id);
        return dealArr[0];
    }
);
