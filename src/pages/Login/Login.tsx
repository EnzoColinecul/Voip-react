import React, { ComponentProps, FunctionComponent, SetStateAction, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonToast
} from "@ionic/react"
import { Dispatch } from 'redux'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { startLoginWithUserAndPassword } from '../../actions/auth'
import { settingsSharp } from 'ionicons/icons'
import LoginSettings from '../../components/LoginSettings'
import './Login.css'
import useForm from '../../hooks/useForm'
import { setError } from '../../actions/ui'

export interface LoginSettings {
  settingsLog: any;
  showSettings: boolean;
  errors: any;
  name?: string | null;
}


const Login = () => {

  const dispatch: Dispatch<any> = useDispatch()
  const { msgError } = useSelector((state: RootStateOrAny) => state.ui)

  const [showModal, setShowModal] = useState(false)
  const [formValues, handleInputChange] = useForm({
    username: "103@192.168.1.10:8088",
    password: "enzo103"
  })

  const { username, password } = formValues

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLoginWithUserAndPassword(username, password))
  }

  return (
    <>
      <IonToast
        isOpen={msgError !== null}
        onDidDismiss={() => dispatch(setError(null)) }
        message={msgError}
        position="top"
        duration={5000}
      />
      <IonModal onDidDismiss={() => setShowModal(false)} isOpen={showModal}>
        <LoginSettings setShowModal={setShowModal} />
      </IonModal>
      <IonContent color='primary'>
        <IonCard className="md ion-margin-horizontal" >
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle>Login</IonCardTitle>
              <IonButton
                fill='clear'
                onClick={() => setShowModal(true)}
              >
                <IonIcon color='dark' icon={settingsSharp}></IonIcon>
              </IonButton>
            </IonCardHeader>
            <IonGrid size-md='6'>
              <IonRow >
                <IonCol  >
                  <IonLabel color='primary'>Ingrese Datos de Usuario</IonLabel>
                  <IonItem color='light'>
                    <IonInput
                      onIonChange={handleInputChange}
                      name='username'
                      value={username}
                      type='text'
                      placeholder='Usuario@PBX/VoIP'
                      color={('dark')}
                      required
                      clearInput
                    />
                  </IonItem>
                  <IonLabel color='primary'>Ingrese Contraseña</IonLabel>
                  <IonItem color='light'>
                    <IonIcon color='light' name="eye-outline"></IonIcon>
                    <IonInput
                      onIonChange={handleInputChange}
                      name='password'
                      value={password}
                      type='password'
                      placeholder='Contraseña'
                      required
                      clearInput
                    />
                  </IonItem>
                  <IonButton
                    onClick={handleLogin}
                    expand='block'
                  >
                    Ingresar
                </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </>
  )
}

Login.propTypes = {
  // settings: PropTypes.object.isRequired,
  // onLogin: PropTypes.func.isRequired
}

export default Login
