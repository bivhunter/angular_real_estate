import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/user/model/user';

export const getUserSuccess = createAction(
  '[UserApi] Get User Success',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[UserApi] Update User Success',
  props<{ user: User }>()
);


