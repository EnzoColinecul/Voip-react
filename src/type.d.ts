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
  extensionNumber: number,
  sessionState: string,
}

type SipAction = {
  type: string,
  payload: SipInterface
}