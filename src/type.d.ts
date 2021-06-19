interface ILogin {
  user: string  | null,
  registerState: string | null
}

type LoginState = ILogin


type LoginAction = {
  type: string,
  payload: ILogin
}


interface IUserInterface {
  loading: boolean,
  msgError: string
}

type UiError = string

type UiAction = {
  type: string,
  payload: IUserInterface
}

interface SipInterface {
  extensionToCall: string | null,
  sessionState: string | null,
}

type SipState = {
  userAgent: object | UserAgent,
  extensionToCall: string | null,
  sessionState: string | null,
  startCall: string | null
}

type SipAction = {
  type: string,
  payload: SipInterface
}