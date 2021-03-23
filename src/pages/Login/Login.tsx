import React, { useState } from 'react'
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
import LoginSettings from '../../components/LoginSettings'
import './Login.css'


const Login = ({ settings }: any) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginSettings, setLoginSettings] = useState({
    settingsLog: settings,
    showSettings: false,
    errors: {
      name: null
    }
  })


  const handleLogin = (e: React.MouseEvent<HTMLIonButtonElement>) => {
    e.preventDefault()
    console.log(username, password);
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



  return (
    <>
      <IonModal isOpen={loginSettings.showSettings}>
        <LoginSettings dismissModal={closeModal} />
      </IonModal>
      <IonContent color='primary'>
        <IonCard>
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle > Login</IonCardTitle>
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
                      name='username'
                      type='email'
                      placeholder='Username@PBX/VoIP provider'
                      value={username}
                      required
                      clearInput
                      onIonChange={((e: any) => setUsername(e.target.value))}
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
                      onIonChange={((e: any) => setPassword(e.target.value))}
                    />
                  </IonItem>
                  <IonButton
                    expand='block'
                    onClick={handleLogin}
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
  settings: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired
}

export default Login
