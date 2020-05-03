import * as fromUi from './shared/ui.reducer'
import * as fromAuth from './auth/auth.reducer'
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";

export interface State {
  ui: fromUi.StateUiReducer,
  auth: fromAuth.StateAuthReducer
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
}

export const getUiState = createFeatureSelector<fromUi.StateUiReducer>('ui');

export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.StateAuthReducer>('auth');

export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuthenticated);
