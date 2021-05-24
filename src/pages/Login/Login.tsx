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
import LoginSettings from '../../components/LoginSettings'
import './Login.css'

export interface LoginSettings {
  settingsLog: any;
  showSettings: boolean;
  errors: any;
  name?: string | null;
}


const Login = ({ settings, onLogin }: any) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <>
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
                      name='display_name'
                      type='email'
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
                      name='password'
                      type='password'
                      placeholder='Contraseña'
                      required
                      clearInput
                    />
                  </IonItem>
                  <IonButton
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
