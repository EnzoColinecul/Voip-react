import { types } from "../types/types"

const initialState = {
  loading: false,
  msgError: null,
  showAlert: false
}

export const uiReducer = (state = initialState, action: UiAction) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload
      }
    case types.uiRemoveError:
      return {
        ...state,
        msgError: null
      }
    case types.uiStartLoading:
      return {
        ...state,
        loading: true
      }
    case types.uiFinishLoading:
      return {
        ...state,
        loading: false
      }
    case types.uiStartCallAlert:
      return {
        ...state,
        showAlert: true
      }
    case types.uiFinishCallAlert:
      return {
        ...state,
        showAlert: false
      }
    default:
      return state;
  }
}