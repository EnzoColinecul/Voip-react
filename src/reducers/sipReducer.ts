import { UserAgent } from "sip.js";
import { types } from "../types/types";

type initialState = {
  userAgent: object | UserAgent,
  extensionToCall: string | null,
  sessionState: string | null,
  startCall: string | null,
}

const initialState = {
  userAgent: {},
  extensionToCall: null,
  sessionState: null,
  outgoingSession: null,
  incomingSession: null,
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
        sessionState: action.payload
      }
    case types.sipSetExtensionToCall:
      return {
        ...state,
        extensionToCall: action.payload
      }
    case types.sipSetOutgoingCall:
      return {
        ...state,
        outgoingSession: action.payload
      }
    case types.sipStartCommunication:
      return {
        ...state,
        startCall: action.payload
      }
    case types.sipIncomingCall:
      return {
        ...state,
        incomingSession: action.payload
      }
    case types.sipClearIncomingSession:
      return {
        ...state,
        incomingSession: null
      }
    default:
      return state
  }
}