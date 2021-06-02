import { types } from "../types/types";

type initialState = {
  registerState: string
}

export const authReducer = (state: LoginState = { registerState: "" }, action: LoginAction) => {
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