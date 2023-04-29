import { createReducer, on } from "@ngrx/store";
import { IRootState } from "src/app/+store";
import { IAuthState, ILoginState, IRegisterState } from ".";
import { initializeLoginState, initializeRegisterState, loginProcessError, registerProcessError, startLoginProcess, startRegisterProcess } from "./actions"

export const loginInitialState = {
    isLoginPending: false,
    errorMessage: ''
}

export const registerInitialState = {
    errorMessage: '',
    isRegisterPending: false,
}

export const registerReducer = createReducer<IRegisterState>(
    registerInitialState,

    on(startRegisterProcess, (state) => {
        return {
            ...state,
            isRegisterPending: true,
            errorMessage: ''
        }
    }),

    on(registerProcessError, (state, action) => {
        return {
            ...state,
            isRegisterPending: false,
            errorMessage: action.errorMessage,
        }
    }),

    on(initializeRegisterState, (state) => {
        return {
            ...state,
            isRegisterPending: false,
            errorMessage: ''
        }
    })
)


export const loginReducer = createReducer<ILoginState>(
    loginInitialState,

    on(startLoginProcess, (state) => {
        return {
            ...state,
            isLoginPending: true,
            errorMessage: ''
        };
    }),

    on(loginProcessError, (state, action) => {
        return{
            ...state,
            isLoginPending: false,
            errorMessage: action.errorMessage
        }
    }),

    on(initializeLoginState, (state) => {
        return {
            ...state,
            isLoginPending: false,
            errorMessage: ''
        }
    })
)

export interface IAuthModuleState extends IRootState {
    auth: IAuthState
}