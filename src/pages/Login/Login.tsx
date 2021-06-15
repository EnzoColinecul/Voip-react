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
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar
} from "@ionic/react"
import { settingsSharp } from 'ionicons/icons'
import { Dispatch } from 'redux'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { startLoginWithUserAndPassword } from '../../actions/auth'
import { setError } from '../../actions/ui'
import useForm from '../../hooks/useForm'
import LoginSettings from '../../components/LoginSettings'
import logo from '../../assets/images/voip-icon-v2.svg'
import './Login.css'

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
        onDidDismiss={() => dispatch(setError(null))}
        message={msgError}
        position="top"
        duration={5000}
      />
      <IonModal onDidDismiss={() => setShowModal(false)} isOpen={showModal}>
        <LoginSettings setShowModal={setShowModal} />
      </IonModal>
      <IonContent color='primary'>
        <IonToolbar >
          <IonButton
            slot='end'
            fill='clear'
            onClick={() => setShowModal(true)}
          >
            <IonIcon color='dark' icon={settingsSharp}></IonIcon>
          </IonButton>
        </IonToolbar>
        <div className='login-subheader'>
          <IonIcon icon={logo} ></IonIcon>
        </div>
        <form className='ion-padding'>
          <IonCol>
            <IonLabel color='secondary' >Ingrese Datos de Usuario</IonLabel>
            <IonItem className='login-item'>
              <IonInput
                className='login-input'
                onIonChange={handleInputChange}
                name='username'
                value={username}
                type='text'
                placeholder='Usuario@PBX/VoIP'
                required
                clearInput
              />
            </IonItem>
            <IonItem className='login-item'>
              <IonInput
                className='login-input'
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
              expand='block'
              color='dark'
              className='ion-padding-horizontal'
              onClick={handleLogin}
            >
              Ingresar
            </IonButton>
          </IonCol>
        </form>
        
      </IonContent>
    </>
  )
}

export default Login
