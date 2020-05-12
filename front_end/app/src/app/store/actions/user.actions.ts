import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/modules/user/model/user';

export const getUser = createAction(
    '[User] Get User',
);

export const updateUser = createAction(
    '[User] Update User',
    props<{user: User}>()
);





