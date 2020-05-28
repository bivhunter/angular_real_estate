import { createReducer, on } from '@ngrx/store';
import * as userApiAction from '../actions/user-api.actions';
import { User } from 'src/app/modules/user/model/user';



export interface State {
    user: User;
    isStoreInit: boolean;
}

export const initState: State = {
    user: null,
    isStoreInit: false
};

export const usersReducer = createReducer(
    initState,
    on(userApiAction.getUserSuccess, (state, {user}) => {
        return {
            ...state,
            user
        };
    }),
     on(userApiAction.updateUserSuccess, (state, {user}) => {
        return {
            ...state,
           user
        };
    }),
    on(userApiAction.initStoreSuccess, (state) => {
        return {
            ...state,
            isStoreInit: true
        };
    })
);


// for selectors
export const getUser = (state: State) => state.user;
export const getStoreStatus = (state: State) => state.isStoreInit;

// additional function

