import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from 'src/app/store/reducers/index';
import { sortClients } from '../functions/sorting-functions';
import { filterClients } from '../functions/filtered-functions';
import { Client } from 'src/app/modules/clients/model/client';

export const getInitStoreStatus = createSelector(
    fromApp.getInitStoreStatus,
    (value) => value
);


