import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from 'src/app/store/reducers/user.reducer';

export const getUserState = createFeatureSelector<fromUser.State>('userState');


export const getViewMode = createSelector(
    getUserState,
    fromUser.getUser
);


