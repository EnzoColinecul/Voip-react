import { types } from "../types/types"
import {
  Invitation,
  InvitationAcceptOptions,
  Referral,
  Registerer,
  RegistererState,
  Session,
  SessionState,
  UserAgent,
  UserAgentOptions,
  Web
} from 'sip.js'
import { setError, startLoading, finishLoading } from "./ui"
import {assignStream} from '../helpers/assignStream'

export const startLoginWithUserAndPassword = (user: string, password: string) => {

  return async (dispatch: any) => {
    dispatch(startLoading())
    const uri = UserAgent.makeURI(`sip:${user}`)
    const transportOptions = {
      server: 'ws://192.168.1.10:8088/ws'
    }

    let subString: string = ""

    if (!uri) {
      throw new Error('Failed to create URI')
    } else {
      subString = user.split('@')[0]
    }

    const userAgentOptions: UserAgentOptions = {
      uri,
      transportOptions,
      authorizationPassword: password,
      authorizationUsername: subString,
      displayName: subString,
    }

    const userAgent = new UserAgent(userAgentOptions)

    const registerer = new Registerer(userAgent)

    userAgent.start().then(() => {
      setTimeout(() => {
        registerer.register()
        registerer.stateChange.addListener((newState: RegistererState) => {
          switch (newState) {
            case RegistererState.Initial:
              break;
            case RegistererState.Registered:
              dispatch(login(subString, RegistererState.Registered))
              dispatch(UA(userAgent))
              break;
            case RegistererState.Unregistered:
              dispatch(setError(`Ingreso fallido, compruebe los datos ingresados SIP:${RegistererState.Unregistered}`))
              break;
            case RegistererState.Terminated:
              break;
            default:
              break;
          }
        })
        dispatch(finishLoading())
      }, 1000);
    }).catch((err: Error) => {
      alert(err);
    })
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

        const remoteAudio: HTMLAudioElement | null = document.querySelector('#remoteAudio')
        const localAudio: HTMLAudioElement | null = document.querySelector('#localAudio')


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

        let constrainsDefault: MediaStreamConstraints = {
          audio: true,
          video: false,
        }

        const options: InvitationAcceptOptions = {
          sessionDescriptionHandlerOptions: {
            constraints: constrainsDefault,
          },
        }
        invitation.accept(options)
      }
    }
  }
}

export const login = (user: string, registerState: string) => ({
  type: types.authLogin,
  payload: {
    user,
    registerState,
    test: 'pasaeltest'
  }
})

export const UA = (userAgent: UserAgent) => ({
  type: types.sipUserAgent,
  payload: userAgent
})