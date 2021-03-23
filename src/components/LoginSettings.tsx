import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader, IonRow, IonTitle, IonToolbar
} from "@ionic/react"

interface LoginSettingsProps {
  dismissModal: () => void;
}

const LoginSettings: React.FC<LoginSettingsProps> = ({ dismissModal }) => {

  const confirmSettings = () => {
    dismissModal()
  }

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot='start' >
            <IonBackButton defaultHref='/login' ></IonBackButton>
          </IonButtons>
          <IonTitle>Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol className='ion-text-center'>
            <IonButton color='danger' fill='clear' onClick={dismissModal}>
              Cancel
            </IonButton>
          </IonCol>
          <IonCol className='ion-text-center'>
            <IonButton color='primary' fill='clear' onClick={confirmSettings}>
              Complete
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </>
  )
}

export default LoginSettings