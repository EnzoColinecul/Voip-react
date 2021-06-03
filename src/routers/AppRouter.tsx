import React, { useEffect, useState } from 'react'
import { IonLoading, IonRedirect, IonRouterOutlet, IonToast } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route, Switch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import { setError } from '../actions/ui'

const AppRouter = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const { msgError, loading } = useSelector((state: RootState) => state.ui)
  const { registerState } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    setIsLogged(false)
    if (registerState === 'Registered') {
      setIsLogged(true)
    }
  }, [registerState])

  return (
    <>
      <IonToast
        isOpen={msgError !== null}
        onDidDismiss={() => dispatch(setError(null))}
        message={msgError}
        position="top"
        duration={2000}
        color="light"
      />
      <IonLoading isOpen={loading} message="Espere..." duration={4000} />
      <IonReactRouter>
        <Switch>
          <PrivateRoute
            exact
            path='/'
            isLogged={isLogged}
            component={Home}
          />
          <PublicRoute
            path='/auth/login'
            isLogged={isLogged}
            component={Login}
          />
          <Redirect to='/' />
        </Switch>
      </IonReactRouter>
    </>
  )
}

export default AppRouter
