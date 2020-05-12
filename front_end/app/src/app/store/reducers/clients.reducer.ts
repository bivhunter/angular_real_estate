import { TClientsSortingMethod, TViewMode } from 'src/app/modules/shared/types/types';
import { createReducer, on } from '@ngrx/store';
import * as clientsAction from '../actions/clients.action';
import * as clientsApiAction from '../actions/clients-api.actions';
import { selectClientsSortingMethod } from '../functions/sorting-functions';
import { Client } from 'src/app/modules/clients/model/client';



export interface State {
    clients: Client[];
    viewMode: TViewMode;
    sortingMethod: TClientsSortingMethod;
    searchingString: string;
}

export const initState: State = {
    clients: [],
    viewMode: localStorage.getItem('viewClientsMode') as TViewMode || 'cards',
    sortingMethod: 'SURNAME_UP',
    searchingString: ''
};

export const clientsReducer = createReducer(
    initState,
    on(clientsAction.setSortingField, (state, {sortingMethodField}) => {
        return {
            ...state,
            sortingMethod: selectClientsSortingMethod(state.sortingMethod, sortingMethodField)
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
export const getSortingMethod = (state: State) => state.sortingMethod;
export const getSearchingString = (state: State) => state.searchingString;
export const getClients = (state: State) => state.clients;

// additional function

