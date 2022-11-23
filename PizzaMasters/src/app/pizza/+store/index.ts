import { IPizza } from "src/app/core/interfaces/pizza"

export interface IMenuState {
    isLoading: boolean,
    pizzas: IPizza[]
}

export interface IPizzaState {
    menu: IMenuState
}