
export interface IRegisterState {
    errorMessage: string,
    isRegisterPending: boolean
}

export interface ILoginState {
    errorMessage: string, 
    isLoginPending: boolean
}

export interface IRegisterState {
    errorMessage: string,
    isRegisterPending: boolean
}

export interface IAuthState {
    login: ILoginState
    register: IRegisterState
}