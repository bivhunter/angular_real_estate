import { createAction, props } from "@ngrx/store";
import { User } from "src/app/modules/user/model/user";

export const clearStore = createAction("[App] Logout");

export const initStore = createAction("[App] Init Store");
