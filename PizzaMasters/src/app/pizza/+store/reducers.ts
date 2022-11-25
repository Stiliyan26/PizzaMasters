import { createReducer, on } from "@ngrx/store";
import { IRootState } from "src/app/+store";
import { IDialogState, IMenuState, IPizzaState } from ".";
import { endLoadingProcess, endShowDialogProcess, menuDataState, startLoadingProcess, startShowDialogProcess } from "./actions";


const initialPizzaState = {
    isLoading: false,
    pizzas: []
}

export const menuReducer = createReducer<IMenuState>(initialPizzaState,
    on(startLoadingProcess, (state => {
        return {
            ...state,
            isLoading: true,
            pizzas: []
        }
    }
    )),

    on(endLoadingProcess, (state) => {
        return {
            ...state,
            isLoading: false
        }
    }),

    on(menuDataState, (state, action) => {
        return {
            ...state,
            isLoading: false,
            pizzas: action.pizzas
        }
    })
)

const initDialogState = {
    viewDialog: false
}

export const dialogReducer = createReducer<IDialogState>(initDialogState,
    on(startShowDialogProcess, (state) => {
        return {
            ...state,
            viewDialog: true
        }
    }),

    on(endShowDialogProcess, (state) => {
        return {
            ...state,
            viewDialog: false
        }
    })
)


export interface IPizzaModuleState extends IRootState {
    pizza: IPizzaState;
}
