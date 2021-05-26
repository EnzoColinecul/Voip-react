interface ILogin {
  user: string,
  registerState: string
}

type LoginState = {
  user: ILogin,
  registerState: ILogin
}

type LoginAction = {
  type: string,
  payload: {
    user: ILogin,
    registerState: ILogin
  }
}


interface IUserInterface {
  loading: boolean,
  msgError: string
}

type UiError  = string

type UiAction = {
  type: string,
  payload: IUserInterface
}

type Dispatchers = { LoginAction, UiAction }

type DispatchType = (args: LoginAction) => LoginAction
