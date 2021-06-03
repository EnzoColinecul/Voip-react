import { ThunkAction } from "redux-thunk";
import { Invitation, Inviter, Referral, Session, SessionState, UserAgent, Web } from "sip.js";
import { assignStream } from "../helpers/assignStream";
import { sip_domain } from "../server/domain";
import { RootState } from "../store/store";

type Actions = { type: 'FOO' } | { type: 'BAR'; result: number };

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Actions>;

export const startCall = (sipToCall: string): ThunkResult<void> => {
  return (dispatch, getState) => {
    const { userAgent } = getState().sip

    const remoteAudio: HTMLAudioElement | null = document.querySelector('#remoteAudio')
    const localAudio: HTMLAudioElement | null = document.querySelector('#localAudio')

    const target = UserAgent.makeURI(`sip:${sipToCall}@${sip_domain}`);
    if (!target) {
      throw new Error("Failed to create target URI.")
    }

    const inviter = new Inviter(userAgent, target)

    const outgoingSession = inviter

    /*  outgoingSession.delegate = {
       // Handle incoming REFER request.
       onRefer(referral: Referral): void {
         // ...
       }
     }; */

    // Handle outgoing session state changes.
    outgoingSession.stateChange.addListener((newState: SessionState) => {
      switch (newState) {
        case SessionState.Establishing:
          // Session is establishing.
          const sessionDescriptionHandler = outgoingSession.sessionDescriptionHandler
          if (!sessionDescriptionHandler || !(sessionDescriptionHandler instanceof Web.SessionDescriptionHandler)) {
            throw new Error("Invalid session description handler.");
          }
          if (localAudio) {
            assignStream(sessionDescriptionHandler.localMediaStream, localAudio);
          }
          if (remoteAudio) {
            assignStream(sessionDescriptionHandler.remoteMediaStream, remoteAudio);
          }
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

    /* // Send an outgoing REFER request
    const transferTarget = UserAgent.makeURI("sip:transfer@example.com");

    if (!transferTarget) {
      throw new Error("Failed to create transfer target URI.");
    } */
  }
}

export const startReceiveCall = (): ThunkResult<void> => {
  return (dispatch, getState) => {
    const { userAgent } = getState().sip
    userAgent.delegate = {
      onInvite(invitation: Invitation): void {

        // An Invitation is a Session
        const incomingSession: Session = invitation;
        console.log(incomingSession);
        
        // Setup incoming session delegate
        incomingSession.delegate = {
          // Handle incoming REFER request.
          onRefer(referral: Referral): void {
            // ...
          }
        };

        // Handle incoming session state changes.
        incomingSession.stateChange.addListener((newState: SessionState) => {
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
      }
    }
  }
}
