import { types } from "../types/types";

export const sipReducer = (state: SipInterface, action: SipAction) => {
  switch (action.type) {
    case types.sipStartCalling:
      return {
        ...state,
        extensionNumber: action.payload.extensionNumber,
        sessionState: action.payload.sessionState
      }
    default:
  }
}