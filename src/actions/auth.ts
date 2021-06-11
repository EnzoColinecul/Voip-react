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
import { assignStream } from '../helpers/assignStream'
import { createElement } from "react"
import { TransportOptions } from "sip.js/lib/platform/web"
import { setInvitation } from "./sip"
import { ThunkAction } from "redux-thunk"
import { RootState } from "../store/store"
import { ws_domain } from "../server/domain"

type Actions = { type: 'FOO' } | { type: string};

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Actions>;

export const startLoginWithUserAndPassword = (user: string, password: string): ThunkResult<void> => {

  return async (dispatch) => {
    dispatch(startLoading())
    const uri = UserAgent.makeURI(`sip:${user}`)
    const transportOptions: TransportOptions = {
      server: ws_domain,
      connectionTimeout: 60 * 10,
      traceSip: true,
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
      delegate: {
        onInvite: (invitation) => dispatch(setInvitation(invitation))
      }
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
  }
}

export const login = (user: string, registerState: string) => ({
  type: types.authLogin,
  payload: {
    user,
    registerState,
  }
})

export const UA = (userAgent: UserAgent) => ({
  type: types.sipUserAgent,
  payload: userAgent
})