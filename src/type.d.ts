interface ILogin {
  user: string,
  registerState: string
}

type LoginState = {
  registerState: string 
}

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

type SipAction = {
  type: string,
  payload: SipInterface
}