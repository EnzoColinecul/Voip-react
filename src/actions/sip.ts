import { ThunkAction } from "redux-thunk";
import {
  Invitation,
  InvitationAcceptOptions,
  Inviter,
  InviterOptions,
  Referral,
  Session,
  SessionState,
  UserAgent,
  Web
} from "sip.js";
import { RootState } from "../store/store";
import { assignStream } from "../helpers/assignStream";
import { sip_domain, ws_domain } from "../server/domain";
import { startAlert } from "./ui";
import { types } from "../types/types";

type Actions = { type: 'FOO' } | { type: string; };

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Actions>;

const remoteAudio: HTMLAudioElement | null = document.querySelector('#remoteAudio')
const localAudio: HTMLAudioElement | null = document.querySelector('#localAudio')

export const startCall = (sipToCall: string): ThunkResult<void> => {
  return async (dispatch, getState) => {
    dispatch(setExtensionTocall(sipToCall))

    const { userAgent } = getState().sip
    const { user } = getState().auth

    const target = UserAgent.makeURI(`sip:${sipToCall}@${sip_domain}`);
    if (!target) {
      throw new Error("Failed to create target URI.")
    }

    const inviter = new Inviter(userAgent, target)
    const outgoingSession = inviter
    
    dispatch(handleStateChanges(inviter, remoteAudio))

    const inviterOptions: InviterOptions = {
      params: {
        fromDisplayName: `${user}@${sip_domain}`,
        fromUri: `sip:${user}@${sip_domain}`
      }
    }

    outgoingSession.delegate = {
      // Handle incoming REFER request.
      onRefer(referral: Referral): void {
        // ...
      },
    }
    
    // Send the INVITE request
    inviter.invite()
    .then(() => {
      // INVITE sent
        dispatch(setOutgoingSession(outgoingSession))
      })
      .catch((error: Error) => {
        // INVITE did not send
      });
  }
}

export const setOutgoingSession = (outgoingSession: Inviter) => ({
  type: types.sipSetOutgoingCall,
  payload: outgoingSession
})

export const setExtensionTocall = (sipToCall: string) => ({
  type: types.sipSetExtensionToCall,
  payload: sipToCall
})

export const startAcceptCall = (invitation: Invitation): ThunkResult<void> => {
  return (dispatch, getState) => {
    const incomingSession = invitation

    console.error(incomingSession);
    
    // Setup incoming session delegate
    incomingSession.delegate = {
      // Handle incoming REFER request.
      onRefer(referral: Referral): void {
        // ...
      }
    };
    // Handle incoming session state changes.
    let constrainsDefault: MediaStreamConstraints = {
      audio: true,
      video: false,
    }

    const options: InvitationAcceptOptions = {
      sessionDescriptionHandlerOptions: {
        constraints: constrainsDefault,
      }
    }
    incomingSession.accept(options)
  }
}

export const startRejectCall = (invitation: Invitation): ThunkResult<void> => {
  return (dispatch) => {
    invitation.reject()
    dispatch(clearIncomingSession())
  }
}

export const clearIncomingSession = () => ({
  type: types.sipClearIncomingSession
})

export const startReceiveInvitation = (invitation: Invitation): ThunkResult<void> => {
  return async(dispatch) => {
    
    dispatch(handleStateChanges(invitation, remoteAudio))
    dispatch(setInvitation(invitation))
  }
}

export const setInvitation = (invitation: Invitation) => ({
  type: types.sipIncomingCall,
  payload: invitation
})

export const handleStateChanges = (
  session: Session,
  remoteHTMLMediaElement: HTMLAudioElement | HTMLVideoElement | null
): ThunkResult<void> => {
  return (dispatch) => {
    const options = {
      requestOptions: {
        body: {
          contentDisposition: "render",
          contentType: "application/dtmf-relay",
          content: "Signal=1\r\nDuration=1000"
        }
      }
    }
    
    session.stateChange.addListener((state: SessionState) => {
      console.error(state);
      switch (state) {
        case SessionState.Initial:
          session.info(options)
          break;
        case SessionState.Establishing:
          dispatch(setSessionState(SessionState.Establishing))
          break;
        case SessionState.Established:
          dispatch(setSessionState(SessionState.Established))
          const sessionDescriptionHandler = session.sessionDescriptionHandler;
          if (!sessionDescriptionHandler || !(sessionDescriptionHandler instanceof Web.SessionDescriptionHandler)) {
            throw new Error("Invalid session description handler.");
          }
          if (remoteHTMLMediaElement) {
            assignStream(sessionDescriptionHandler.remoteMediaStream, remoteHTMLMediaElement);
          }
          return SessionState.Established
          break;
        case SessionState.Terminating:
          break;
        case SessionState.Terminated:
          dispatch(setSessionState(SessionState.Terminated))
          dispatch(clearIncomingSession())
          break;
        default:
          throw new Error("Unknown session state.");
      }
    })
  }
}

export const setSessionState = (sessionState: SessionState) => ({
  type: types.sipStartCalling,
  payload: sessionState
})

export const startHangupCall = (invitation: Inviter): ThunkResult<void> => {
  return (dispatch, getState) => {
    const { sessionState } = getState().sip
    if (sessionState === 'Establishing') invitation.cancel()
    else invitation.bye()
    dispatch(clearIncomingSession())
  }
}