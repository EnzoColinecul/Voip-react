import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import clone from "clone"
import { useState } from "react"

interface LoginSettingsProps {
  dismissModal: () => void;
  handleConfirmSettings: any;
  loginSettings: any;
}

const LoginSettings: React.FC<LoginSettingsProps> = ({ dismissModal, loginSettings, handleConfirmSettings }) => {

  const [settingsOptions, setSettingsOptions] = useState(clone(loginSettings))
  const { settingsLog, showSettings, errors } = settingsOptions

  

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setSettingsOptions({ ...settingsOptions, settingsLog: { ...settingsLog, [name]: value } })
    errors.name = null
  }

 

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot='start' >
            <IonBackButton defaultHref='/login' ></IonBackButton>
          </IonButtons>
          <IonTitle>JsSIP Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position='floating'>SIP URI</IonLabel>
            <IonInput
              name='uri'
              value={settingsLog?.uri}
              onIonChange={handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>SIP password</IonLabel>
            <IonInput
              name='password'
              value={settingsLog?.password}
              onIonChange={handleChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>WebSocket URI</IonLabel>
            <IonInput
              name='wss'
              value={settingsLog?.wss}
              onIonChange={handleChange}
            />
          </IonItem>
          <IonRow>
            <IonCol className='ion-text-center'>
              <IonButton color='danger' fill='solid' onClick={dismissModal}>
                Cancel
            </IonButton>
            </IonCol>
            <IonCol className='ion-text-center'>
              <IonButton color='primary' fill='solid' onClick={handleConfirmSettings(settingsOptions)}>
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