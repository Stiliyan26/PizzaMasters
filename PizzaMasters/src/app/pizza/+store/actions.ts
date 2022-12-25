import { createAction, props } from "@ngrx/store";
import { IPizza } from "src/app/core/interfaces/pizza";

const menuDomain = ['MenuComponent'];
export const startLoadingProcess = createAction(`${menuDomain} Start menu loading`);

export const endLoadingProcess = createAction(`${menuDomain} End menu loading`);

export const menuDataState = createAction(`${menuDomain} Menu state set`, props<{pizzas: IPizza[]}>());

const dialogDomain = ['DeleteDialogComponent'];
export const startShowDialogProcess = createAction(`${dialogDomain} Start dialog process`);

export const endShowDialogProcess = createAction(`${dialogDomain} End dialog process`);

const cartDomain = ['CartComponent'];
export const startCartLoadingProcess = createAction(`${cartDomain} Start cart loading`);

export const endCartLoadingProcess = createAction(`${cartDomain} End cart loading`);

export const cartDataState = createAction(`${cartDomain} Cart state set`, props<{pizzas: IPizza[]}>());
