import { createAction, props } from '@ngrx/store';
import { TViewMode, TClientsSortingField } from 'src/app/modules/shared/types/types';
import { Client } from 'src/app/modules/clients/model/client';


export const loadClients = createAction(
    '[Clients] Load Clients'
);

export const addClient = createAction(
    '[Clients] Add Client',
    props<{client: Client}>()
);

export const updateClient = createAction(
    '[Clients] Update Client',
    props<{client: Client}>()
);

export const deleteClient = createAction(
    '[Clients] Delete Client',
    props<{id: string | number}>()
);

export const addHomeToClient = createAction(
    '[Clients] Add Home To Client',
    props<{homeId: string | number, clientId: string | number}>()
);

export const setSortingField = createAction(
    '[Clients] Set Sorting Field',
    props<{sortingMethodField: TClientsSortingField}>()
);

export const setViewMode = createAction(
    '[Clients] Set View Mode',
    props<{viewMode: TViewMode}>()
);

export const setSearchingString = createAction(
    '[Clients] Set Searching String',
    props<{searchingString: string}>()
);



