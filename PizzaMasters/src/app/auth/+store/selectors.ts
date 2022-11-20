import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthState } from ".";

export const authSelector = createFeatureSelector<IAuthState>('auth');

export const registerIsPendingSelector = createSelector(authSelector, (authState: IAuthState) => {
    return authState.register.isRegisterPending;
})

export const registerErrorMessageSelector = createSelector(authSelector, (authState: IAuthState) => {
    return authState.register.errorMessage;
})