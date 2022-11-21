import { createReducer, on } from "@ngrx/store";
import { IUser } from "../core/interfaces/user";
import { login, logout } from "./actions";

const defaultValue = {
    username: '',
    email: '',
    password: '',
    _id: '',
    __v: 0
}

export const currentUserReducer = createReducer<IUser>(defaultValue,
    on(login, (_, action) => action.user),
    on(logout, () => undefined)
)