import { types } from "../types/types";

const initialState = {
  registerState: null,
  user: null
}

export const authReducer = (state: LoginState = initialState, action: LoginAction) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        user: action.payload.user,
        registerState: action.payload.registerState
      }
    default:
      return state
  }
}