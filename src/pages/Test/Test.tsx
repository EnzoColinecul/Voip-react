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
  IonRow
} from "@ionic/react"
import { Registerer, UserAgent, UserAgentOptions, Web } from 'sip.js'
import './Test.css'

export interface LoginSettings {
  settingsLog: any;
  showSettings: boolean;
  errors: any;
  name?: string | null;
}


const Login = () => {
  /* const [loginSettings, setLoginSettings] = useState({
    settingsLog: settings,
    showSettings: false,
    errors: {
      name: ''
    }
  })

  const { settingsLog, showSettings, errors }: LoginSettings = loginSettings

  useEffect(() => {
    errors.name = null
  }, [loginSettings])

  const handleLogin = (e: React.MouseEvent<HTMLIonButtonElement>) => {
    e.preventDefault()
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setLoginSettings({ ...loginSettings, settingsLog: { ...settingsLog, [name]: value } })
  }

  const handleConfirmSettings = (settingsOptions: any) => {
    setLoginSettings(settingsOptions)
  } */

  const transportOptions = {
    server: 'ws://192.168.1.102:8089/ws'
  }

  const uri = UserAgent.makeURI("sip:101@192.168.1.102")

  const userAgentOptions: UserAgentOptions = {
    authorizationUsername: '101',
    authorizationPassword: '',
    transportOptions,
    uri
  }

  const userAgent = new UserAgent(userAgentOptions)



  const registerer = new Registerer(userAgent)

  const handleRegisterer = () => {

    userAgent.start().then(() => {
      registerer.register();
    });
  }

  console.log(registerer);

  return (
    <>
      <IonContent color='primary'>
        <IonCard>
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle> Test</IonCardTitle>
            </IonCardHeader>
            <IonGrid size-md='6'>
              <IonRow >
                <IonCol  >
                  <IonLabel color='primary'>Ingrese Datos de Usuario</IonLabel>
                  <IonItem color='light'>
                    <IonInput
                      name='display_name'
                      type='email'
                      placeholder='Username'
                      required
                      clearInput
                    />
                  </IonItem>
                  <IonLabel color='primary'>Ingrese Contraseña</IonLabel>
                  <IonItem color='light'>
                    <IonIcon color='light' name="eye-outline"></IonIcon>
                    <IonInput
                      name='password'
                      type='password'
                      placeholder='Ej: 101extension'
                      required
                      clearInput

                    />
                  </IonItem>
                  <IonLabel>
                  </IonLabel>
                  <IonButton
                    expand='block'
                    onClick={handleRegisterer}
                  >
                    Llamar
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

export default Login
