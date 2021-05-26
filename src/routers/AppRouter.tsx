import React, { useEffect, useState } from 'react'
import { IonLoading, IonRedirect, IonRouterOutlet, IonToast } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route, Switch } from 'react-router'
import { RootStateOrAny, useSelector } from 'react-redux'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'

const AppRouter = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const { msgError, loading } = useSelector((state: RootStateOrAny) => state.ui)
  const { registerState } = useSelector((state: RootStateOrAny) => state.auth)

  useEffect(() => {
    setIsLogged(false)
    if (registerState === 'Registered') {
      setIsLogged(true)
    }
  }, [registerState])

  return (
    <>
      <IonToast
        isOpen={msgError}
        message={msgError}
        position="top"
        duration={200}
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
