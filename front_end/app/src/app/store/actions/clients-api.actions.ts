import { createAction, props } from '@ngrx/store';
import { TViewMode } from 'src/app/modules/shared/types/types';
import { Client } from 'src/app/modules/clients/model/client';

export const setViewModeSuccess = createAction(
  '[ClientsApi] Set View Mode Success',
  props<{ viewMode: TViewMode }>()
);

export const getClientsSuccess = createAction(
  '[ClientsApi] Get Clients Success',
  props<{ clients: Client[] }>()
);

export const addClientSuccess = createAction(
  '[ClientsApi] Add Client Success',
  props<{ client: Client }>()
);

export const deleteClientSuccess = createAction(
  '[ClientsApi] Delete Client Success',
  props<{ id: string | number }>()
);

export const updateClientSuccess = createAction(
  '[ClientsApi] Update Client Success',
  props<{ client: Client }>()
);


