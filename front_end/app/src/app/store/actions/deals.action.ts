import { createAction, props } from '@ngrx/store';
import { Deal } from 'src/app/modules/deal/model/deal';
import { TViewMode, ISortingConf } from 'src/app/modules/shared/types/types';


export const loadDeals = createAction(
    '[Deals] Load Deals'
);

export const addDeal = createAction(
    '[Deals] Add Deal',
    props<{deal: Deal}>()
);

export const setSortingConf = createAction(
    '[Deals] Select Sorting Field',
    props<{sortingConf: ISortingConf}>()
);

export const setViewMode = createAction(
    '[Deals] Set View Mode',
    props<{viewMode: TViewMode}>()
);

export const setSearchingString = createAction(
    '[Deals] Set Searching String',
    props<{searchingString: string}>()
);



