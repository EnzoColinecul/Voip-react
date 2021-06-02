import { types } from "../types/types";

export const startLoading = () => ({
  type: types.uiStartLoading
})

export const finishLoading = () => ({
  type: types.uiFinishLoading
})

export const setError = ( msgError : UiError) => ({
  type: types.uiSetError,
  payload: msgError
})