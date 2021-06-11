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
import { handleStateChanges } from "../helpers/onChangeSessionState";
import { sip_domain, ws_domain } from "../server/domain";
import { startAlert } from "./ui";
import { types } from "../types/types";

type Actions = { type: 'FOO' } | { type: string; };

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Actions>;

const remoteAudio: HTMLAudioElement | null = document.querySelector('#remoteAudio')
const localAudio: HTMLAudioElement | null = document.querySelector('#localAudio')

export const startCall = (sipToCall: string): ThunkResult<void> => {
  return async (dispatch, getState) => {
    const { userAgent } = getState().sip
    const { user } = getState().auth

    const target = UserAgent.makeURI(`sip:${sipToCall}@${sip_domain}`);
    if (!target) {
      throw new Error("Failed to create target URI.")
    }

    const inviter = new Inviter(userAgent, target)

    const inviterOptions: InviterOptions = {
      params: {
        fromDisplayName: `${user}@${sip_domain}`,
        fromUri: `sip:${user}@${sip_domain}`
      }
    }

    const outgoingSession = inviter
    handleStateChanges(outgoingSession, localAudio, remoteAudio)

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
      })
      .catch((error: Error) => {
        // INVITE did not send
      });
  }
}

export const startAcceptCall = (invitation: Invitation): ThunkResult<void> => {
  return (dispatch, getState) => {
    const incomingSession = invitation

    handleStateChanges(incomingSession, localAudio, remoteAudio)

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

export const clearIncomingSession = () =>({
  type: types.sipClearIncomingSession
})

export const setInvitation = (invitation: Invitation) => ({
  type: types.sipIncomingCall,
  payload: invitation
})


