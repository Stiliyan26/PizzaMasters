import { createReducer, on } from "@ngrx/store";
import { IUser } from "../core/interfaces/user";
import { login } from "./actions";

const defaultValue = {
    username: '',
    email: '',
    password: ''
}

export const currentUserReducer = createReducer<IUser>(defaultValue,
    on(login, (_, action) => action.user)
)