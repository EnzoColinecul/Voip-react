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
import { settingsSharp } from 'ionicons/icons'
import { getDefaultDomain } from '../../data/settingsManager'
import LoginSettings from '../../components/LoginSettings'
import './Login.css'

export interface LoginSettings {
  settingsLog: any;
  showSettings: boolean;
  errors: any;
  name?: string | null;
}


const Login = ({ settings, onLogin }: any) => {
  const [loginSettings, setLoginSettings] = useState({
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
    _checkForm()
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setLoginSettings({ ...loginSettings, settingsLog: { ...settingsLog, [name]: value } })
  }

  const handleConfirmSettings = (settingsOptions: any) => {
    setLoginSettings(settingsOptions)
  }


  const openModal = () => {
    setLoginSettings({
      ...loginSettings,
      showSettings: true
    })
  }

  const closeModal = () => {
    setLoginSettings({
      ...loginSettings,
      showSettings: false
    })
  }

  const _checkPlay = () => {
    if (settingsLog?.display_name?.length > 5 && !showSettings)
      return true;
    else
      return false;
  }

  const _checkForm = () => {
    let ok = true
    {
      if (settingsLog.display_name.length < 8) {
        ok = false

        !ok && (setLoginSettings({
          ...loginSettings,
          errors: {
            name: 'El Dato de Usuario Ingresado es Corto '
          }
        }))
      }
    }

    if (!settingsLog.uri) {
      const domain = getDefaultDomain()
      settingsLog.uri = `sip:${settingsLog.display_name}@${domain}`
    }

    /* onLogin(settingsLog) */
  }

  return (
    <>
      <IonModal isOpen={loginSettings.showSettings}>
        <LoginSettings
          handleConfirmSettings={handleConfirmSettings}
          loginSettings={loginSettings}
          dismissModal={closeModal}
        />
      </IonModal>
      <IonContent color='primary'>
        <IonCard>
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle> Login</IonCardTitle>
              <IonButton
                fill='clear'
                onClick={openModal}
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
                      name='display_name'
                      type='email'
                      placeholder='Username'
                      color={errors.name ? ('danger') : ('dark')}
                      value={settingsLog?.display_name}
                      required
                      clearInput
                      onIonChange={handleChange}
                    />
                  </IonItem>
                  {errors.name &&
                    <IonLabel className='label-danger' color='danger'>{errors.name}</IonLabel>
                  }
                  <IonLabel color='primary'>Ingrese Contraseña</IonLabel>
                  <IonItem color='light'>
                    <IonIcon color='light' name="eye-outline"></IonIcon>
                    <IonInput
                      name='password'
                      type='password'
                      placeholder='Ej: 101extension'
                      value={settingsLog?.password}
                      required
                      clearInput
                      onIonChange={handleChange}
                    />
                  </IonItem>
                  <IonButton
                    expand='block'
                    onClick={(e) => handleLogin(e)}
                    disabled={!_checkPlay()}
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
