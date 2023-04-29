import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPizzaState } from ".";

export const menuSelector = createFeatureSelector<IPizzaState>('pizza');

export const loadingProcess = createSelector(menuSelector, (menuState: IPizzaState) => {
    return menuState.menu.isLoading;
})