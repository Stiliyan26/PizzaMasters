import { createAction, props } from "@ngrx/store";


const registerDomain = ['RegisterComponent'];
export const startRegisterProcess = createAction(`${registerDomain} Start Register`);

export const registerProcessError = createAction(`${registerDomain} Register Error`, props<{errorMessage: string}>());

export const initializeRegisterState = createAction(`${registerDomain} Register Initialize`);


const loginDomain = '[LoginComponent]';
export const startLoginProcess = createAction(`${loginDomain} Start Login`);

export const loginProcessError = createAction(`${loginDomain} Login Error`, props<{errorMessage: string}>());

export const initializeLoginState = createAction(`${loginDomain} Login Initialize`);
