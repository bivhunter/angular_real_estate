import { createAction, props } from '@ngrx/store';
import { TViewMode, THomesSortingField, ISortingConf } from 'src/app/modules/shared/types/types';
import { Home } from 'src/app/modules/homes/model/home';


export const loadHomes = createAction(
    '[Homes] Load Homes'
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

export const addClientToHome = createAction(
    '[Homes] Add Client To Home',
    props<{homeId: string | number, clientId: string | number}>()
);

export const setSortingConf = createAction(
    '[Homes] Set Sorting Conf',
    props<{sortingConf: ISortingConf}>()
);

export const setViewMode = createAction(
    '[Homes] Set View Mode',
    props<{viewMode: TViewMode}>()
);

export const setSearchingString = createAction(
    '[Homes] Set Searching String',
    props<{searchingString: string}>()
);



