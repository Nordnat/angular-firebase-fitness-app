import {Action} from "@ngrx/store";
import {AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from './auth.actions'

export interface StateAuthReducer {
  isAuthenticated: boolean
}

const initialState: StateAuthReducer = {
  isAuthenticated: false
}

export function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default: {
      return state
    }
  }
}

export const getIsAuthenticated = (state: StateAuthReducer) => state.isAuthenticated;
