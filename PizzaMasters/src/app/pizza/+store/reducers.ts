import { createReducer, on } from "@ngrx/store";
import { IRootState } from "src/app/+store";
import { IMenuState, IPizzaState } from ".";
import { endLoadingProcess, menuDataState, startLoadingProcess } from "./actions";


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

export interface IPizzaModuleState extends IRootState {
    pizza: IPizzaState;
}
