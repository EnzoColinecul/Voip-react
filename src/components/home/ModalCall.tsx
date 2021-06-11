import React from 'react'
import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow
} from "@ionic/react"
import { callSharp } from 'ionicons/icons'

const ModalCall: React.FC = () => {
  return (
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel position='floating'>Call in progress</IonLabel>
        </IonItem>
        <IonRow  >
          <IonCol className='ion-text-center'>
            <IonButton className='modal-btns' color='danger' fill='solid' >
              <IonIcon  icon={callSharp}/>
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
  )
}

export default ModalCall
