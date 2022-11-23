import { createAction, props } from "@ngrx/store";
import { IPizza } from "src/app/core/interfaces/pizza";

const menuDomain = ['MenuComponent'];
export const startLoadingProcess = createAction(`${menuDomain} Start menu loading`);

export const endLoadingProcess = createAction(`${menuDomain} End menu loading`);

export const menuDataState = createAction(`${menuDomain} Menu state set`, props<{pizzas: IPizza[]}>());