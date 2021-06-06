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

type Actions = { type: 'FOO' } | { type: 'BAR'; result: number };

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Actions>;

const remoteAudio: HTMLAudioElement | null = document.querySelector('#remoteAudio')
const localAudio: HTMLAudioElement | null = document.querySelector('#localAudio')

export const startCall = (sipToCall: string): ThunkResult<void> => {
  return (dispatch, getState) => {
    const { userAgent } = getState().sip
    const { user } = getState().auth

    console.error(remoteAudio, localAudio);

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

    outgoingSession.delegate = {
      // Handle incoming REFER request.
      onRefer(referral: Referral): void {
        // ...
      },
    };
    handleStateChanges(outgoingSession, localAudio, remoteAudio)
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

export const startCallReceive = (invitation: Invitation) => {

  // An Invitation is a Session
  const incomingSession = invitation;

  // Setup incoming session delegate
  incomingSession.delegate = {
    // Handle incoming REFER request.
    onRefer(referral: Referral): void {
      // ...
    }
  };

  // Handle incoming session state changes.
  handleStateChanges(incomingSession, localAudio, remoteAudio)

  let constrainsDefault: MediaStreamConstraints = {
    audio: true,
    video: true,
  }

  const options: InvitationAcceptOptions = {
    sessionDescriptionHandlerOptions: {
      constraints: constrainsDefault,
    },
  }
  incomingSession.accept(options)
}



