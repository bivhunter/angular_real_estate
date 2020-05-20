import { TClientsSortingMethod, TViewMode, ISortingConf } from 'src/app/modules/shared/types/types';
import { createReducer, on } from '@ngrx/store';
import * as clientsAction from '../actions/clients.action';
import * as clientsApiAction from '../actions/clients-api.actions';
import { selectClientsSortingMethod } from '../functions/sorting-functions';
import { Client } from 'src/app/modules/clients/model/client';



export interface State {
    clients: Client[];
    viewMode: TViewMode;
    sortingConf: ISortingConf;
    searchingString: string;
}

export const initState: State = {
    clients: null,
    viewMode: localStorage.getItem('viewClientsMode') as TViewMode || 'cards',
    sortingConf: {active: 'surname', direction: 'asc'},
    searchingString: '',
};

export const clientsReducer = createReducer(
    initState,
    on(clientsAction.setSortingConf, (state, {sortingConf}) => {
        return {
            ...state,
            sortingConf
        };
    }),
    on(clientsApiAction.setViewModeSuccess, (state, {viewMode}) => ({...state, viewMode})),
    on(clientsAction.setSearchingString, (state, {searchingString}) => ({...state, searchingString})),
    on(clientsApiAction.getClientsSuccess, (state, {clients}) => {
        return {...state, clients};
    }),
    on(clientsApiAction.addClientSuccess, (state, {client}) => {
        return {
            ...state,
            clients: [...state.clients, client]
        };
    }),
     on(clientsApiAction.updateClientSuccess, (state, {client}) => {
        return {
            ...state,
            clients: state.clients.map(clientItem => {
                if (clientItem.id === client.id) {
                    return client;
                }
                return clientItem;
            })
        };
    }),
    on(clientsApiAction.deleteClientSuccess, (state, {id}) => {
        return {
            ...state,
            clients: state.clients.filter(clientItem => clientItem.id !== id)
        };
    }),

);


// for selectors
export const getViewMode = (state: State) => state.viewMode;
export const getSortingConf = (state: State) => state.sortingConf;
export const getSearchingString = (state: State) => state.searchingString;
export const getClients = (state: State) => state.clients;

// additional function

