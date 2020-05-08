import { createAction, props } from '@ngrx/store';
import { TViewMode, THomesSortingField } from 'src/app/modules/shared/types/types';
import { Home } from 'src/app/modules/homes/model/home';


export const loadHomes = createAction(
    '[Homes] Load Homes'
);

export const loadHome = createAction(
    '[Homes] Load Home',
    props<{id: string | number}>()
);

export const addHome = createAction(
    '[Homes] Add Home',
    props<{home: Home}>()
);

export const updateHome = createAction(
    '[Homes] Update Home',
    props<{home: Home}>()
);

export const deleteHome = createAction(
    '[Homes] Delete Home',
    props<{id: string | number}>()
);

export const setSortingField = createAction(
    '[Homes] Set Sorting Field',
    props<{sortingMethodField: THomesSortingField}>()
);

export const setViewMode = createAction(
    '[Homes] Set View Mode',
    props<{viewMode: TViewMode}>()
);

export const setSearchingString = createAction(
    '[Homes] Set Searching String',
    props<{searchingString: string}>()
);



