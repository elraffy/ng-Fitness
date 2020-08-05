import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from '../app/shared/ui.reducer';
import { authReducer } from './components/auth/auth.reducer';
import * as fromAuth from './components/auth/auth.reducer';


export interface State {
  ui: fromUI.State;
  auth: fromAuth.State;
}

export const reducers : ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};
export const getUIstate = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUIstate, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
