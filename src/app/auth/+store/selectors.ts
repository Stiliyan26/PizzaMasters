import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthState } from ".";

export const authSelector = createFeatureSelector<IAuthState>('auth');

export const registerIsPendingSelector = createSelector(authSelector, (authState: IAuthState) => {
    return authState.register.isRegisterPending;
})

export const registerErrorMessageSelector = createSelector(authSelector, (authState: IAuthState) => {
    return authState.register.errorMessage;
})


export const loginIsPendingSelector = createSelector(authSelector, (authState: IAuthState) => {
    return authState.login.isLoginPending;
})

export const loginErrorMessageSelector = createSelector(authSelector, (authState: IAuthState) => {
    return authState.login.errorMessage;
})