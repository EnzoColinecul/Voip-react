import { ThunkAction } from "redux-thunk";
import { Inviter, Referral, SessionState, UserAgent } from "sip.js";
import { sip_domain } from "../server/domain";
import { RootState } from "../store/store";

type Actions = { type: 'FOO' } | { type: 'BAR'; result: number };

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Actions>;

export const startCall = (sipToCall: string): ThunkResult<void> => {
  return (dispatch, getState) => {
    const { userAgent } = getState().sip

    const target = UserAgent.makeURI(`sip:${sipToCall}@${sip_domain}`);
    if (!target) {
      throw new Error("Failed to create target URI.")
    }

    const inviter = new Inviter(userAgent, target)

    const outgoingSession = inviter

    outgoingSession.delegate = {
      // Handle incoming REFER request.
      onRefer(referral: Referral): void {
        // ...
      }
    };

    // Handle outgoing session state changes.
    outgoingSession.stateChange.addListener((newState: SessionState) => {
      switch (newState) {
        case SessionState.Establishing:
          // Session is establishing.
          break;
        case SessionState.Established:
          // Session has been established.
          break;
        case SessionState.Terminated:
          // Session has terminated.
          break;
        default:
          break;
      }
    });

    // Send the INVITE request
    inviter.invite()
      .then(() => {
        // INVITE sent
      })
      .catch((error: Error) => {
        // INVITE did not send
      });

    // Send an outgoing REFER request
    const transferTarget = UserAgent.makeURI("sip:transfer@example.com");

    if (!transferTarget) {
      throw new Error("Failed to create transfer target URI.");
    }
  }
}

export const startReceiveCall = (): ThunkResult<void> => {
  return (dispatch, getstate) => {

  }
}