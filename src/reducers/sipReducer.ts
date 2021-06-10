import { UserAgent } from "sip.js";
import { types } from "../types/types";

type initialState = {
  userAgent: object | UserAgent,
  extensionToCall: string | null,
  sessionState: string | null,
  startCall: string | null
}

const initialState = {
  userAgent: {},
  extensionToCall: null,
  sessionState: null,
  startCall: '' 
}

export const sipReducer = (state: SipState = initialState, action: SipAction) => {
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
    case types.sipStartCommunication:
      return {
        ...state,
        startCall: action.payload
      }
    default:
      return state
  }
}