import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClients from 'src/app/store/reducers/clients.reducer';
import { sortClients } from '../functions/sorting-functions';
import { filterClients } from '../functions/filtered-functions';
import { Client } from 'src/app/modules/clients/model/client';


export const getClientsState = createFeatureSelector<fromClients.State>('clientsState');


export const getViewMode = createSelector(
    getClientsState,
    fromClients.getViewMode
);

export const getClients = createSelector(
    getClientsState,
    fromClients.getClients
);

export const getSortingConf = createSelector(
    getClientsState,
    fromClients.getSortingConf
);

export const getSearchingString = createSelector(
    getClientsState,
    fromClients.getSearchingString
);

export const getSortedClients = createSelector(
    getClients,
    getSortingConf,
    sortClients
);

export const getFilteredClients = createSelector(
    getSortedClients,
    getSearchingString,
    filterClients
);

export const getClient = createSelector(
    getClients,
    (clients: Client[], id: number | string) => {
        if (!clients) {
            return null;
        }
        const clientArr = clients.filter(client => client.id === +id);
        return clientArr[0];
    }
);
