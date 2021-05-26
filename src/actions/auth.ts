import { types } from "../types/types"
import {
  Registerer,
  RegistererState,
  UserAgent,
  UserAgentOptions
} from 'sip.js'
import { setError, startLoading, finishLoading } from "./ui"

export const startLoginWithUserAndPassword = (user: string, password: string) => {

  return async (dispatch: any) => {
    dispatch(startLoading())
    const uri = UserAgent.makeURI(`sip:${user}`)
    const transportOptions = {
      server: 'ws://192.168.1.10:8088/ws'
    }

    let subString: string = ""

    if (!uri) {
      throw new Error('Failed to create URI');
    } else {
      subString = user.split('@')[0]
    }

    const userAgentOptions: UserAgentOptions = {
      uri,
      transportOptions,
      authorizationPassword: password,
      authorizationUsername: subString,
      displayName: subString,
    };

    console.log(uri, transportOptions, subString);


    const userAgent = new UserAgent(userAgentOptions);
    const registerer = new Registerer(userAgent);

    userAgent.start().then(() => {
      setTimeout(() => {
      registerer.register()
        registerer.stateChange.addListener((newState: RegistererState) => {
          console.log("newstate equal: ", newState);
          switch (newState) {
            case RegistererState.Initial:
              break;
            case RegistererState.Registered:
              dispatch(login(subString, RegistererState.Registered))
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
      }, 4000);
    }).catch((err: Error) => {
      alert(err);
    })
  }
}

export const login = (user: string, registerState: string) => ({
  type: types.authLogin,
  payload: {
    user,
    registerState
  }
})