import { createReducer, on } from '@ngrx/store';
import * as userApiAction from '../actions/user-api.actions';
import { User } from 'src/app/modules/user/model/user';



export interface State {
    user: User;
}

export const initState: State = {
    user: new User()
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
);


// for selectors
export const getUser = (state: State) => state.user;

// additional function

