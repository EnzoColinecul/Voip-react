import React, { useEffect, useState } from 'react'
import { IonAlert, IonLoading, IonRedirect, IonRouterOutlet, IonToast } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route, Switch } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { finishAlert, setError } from '../actions/ui'
import { setCommunication } from '../actions/sip'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'

import './index.css'

const AppRouter = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const { msgError, loading, showAlert } = useSelector((state: RootState) => state.ui)
  const { registerState } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  const handleAnswerCall = () => {
    dispatch(setCommunication('accept'))
  }

  const handlerRejectCall = () => {
    dispatch(setCommunication('reject'))
  }

  const rejectCallBtn = {
    text: 'Reject Call',
    role: 'reject',
    handler: handlerRejectCall
  }

  const answerCallBtn = {
    text: 'Accept',
    handler: handleAnswerCall
  }

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
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => dispatch(finishAlert())}
        header={'Incoming Call'}
        subHeader={'From internal 103'}
        cssClass='my-custom-class '
        buttons={[
          rejectCallBtn,
          answerCallBtn
        ]}
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
