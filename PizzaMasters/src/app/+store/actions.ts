import { createAction, props } from "@ngrx/store";
import { IUser } from "../core/interfaces/user";

const currentUserDomain = '[CurrentUser]'
export const login = createAction(`${currentUserDomain} Login`, props<{user: IUser}>());