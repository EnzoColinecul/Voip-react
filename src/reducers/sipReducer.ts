import { UserAgent } from "sip.js";
import { types } from "../types/types";

type initialState = {
  userAgent: object | UserAgent,
  extensionToCall: string | null,
  sessionState: string | null
}

const initialState = {
  userAgent: {},
  extensionToCall: null,
  sessionState: null
}

export const sipReducer = (state: SipState  = initialState, action: SipAction) => {
  switch (action.type) {
    case types.sipUserAgent:
      return {
        ...state,
        userAgent: action.payload
      }
    case types.sipStartCalling:
      return {
        ...state,
        extensionToCall: action.payload.extensionToCall,
        sessionState: action.payload.sessionState
      }
    default:
      return state
  }
}