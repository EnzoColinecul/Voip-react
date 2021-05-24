import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import clone from "clone"
import { arrowBack } from "ionicons/icons"
import React, { useState } from "react"

type LoginSettingsProps = {
  setShowModal: Function
}

const LoginSettings: React.FC<LoginSettingsProps> = ({ setShowModal }) => {

  const handleChange = (e: any) => {
    const { name, value } = e.target
  }

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot='start' >
            <IonButton onClick={() => setShowModal(false)}>
              <IonIcon icon={arrowBack}/>
            </IonButton>
          </IonButtons>
          <IonTitle>SIP Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position='floating'>SIP URI</IonLabel>
            <IonInput
              name='uri'
              onIonChange={handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>SIP password</IonLabel>
            <IonInput
              name='password'
              onIonChange={handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>WebSocket URI</IonLabel>
            <IonInput
              name='wss'
              onIonChange={handleChange}
            />
          </IonItem>
          <IonRow>
            <IonCol className='ion-text-center'>
              <IonButton color='danger' fill='solid' >
                Cancel
            </IonButton>
            </IonCol>
            <IonCol className='ion-text-center'>
              <IonButton color='primary' fill='solid' >
                Confirm
            </IonButton>
            </IonCol>
          </IonRow>
        </IonList>
      </IonContent>
    </>
  )
}

export default LoginSettings