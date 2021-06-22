import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar
} from '@ionic/react';
import { chevronForwardCircleOutline, ellipseSharp, keypad, settingsSharp } from 'ionicons/icons';
import { Vibration } from '@ionic-native/vibration'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCall, startAcceptCall, startRejectCall, clearIncomingSession } from '../../actions/sip'
import { finishAlert, setError, startAlert } from '../../actions/ui'
import { RootState } from '../../store/store';
import ExploreContainer from '../../components/ExploreContainer';
import KeyPad from '../../components/home/KeyPad';
import ModalCall from '../../components/home/ModalCall';
import CallLog from '../../components/home/CallLog';
import logo from '../../assets/images/voip-icon-v2.svg'

import './Home.css';

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>('')
  const [showKeypad, setShowKeypad] = useState<boolean>(false)

  const { msgError, showAlert } = useSelector((state: RootState) => state.ui)
  const { user } = useSelector((state: RootState) => state.auth)
  const { incomingSession, sessionState } = useSelector((state: RootState) => state.sip)

  const dispatch = useDispatch()

  const handleAnswerCall = () => dispatch(startAcceptCall(incomingSession))

  const handlerRejectCall = () => dispatch(startRejectCall(incomingSession))

  const handleInputChange = (e) => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  const handleBackspace = () => {
    setInputValue(prevState => prevState.substring(0, prevState.length - 1))
  }

  const handleCall = () => {
    if (inputValue) {
      dispatch(startCall(inputValue))
    } else {
      dispatch(setError('Please enter a number to call'))
    }
  }

  const rejectCallBtn = {
    text: 'Reject Call',
    role: 'reject',
    handler: handlerRejectCall,
  }

  const answerCallBtn = {
    text: 'Accept',
    handler: handleAnswerCall,
  }

  if (incomingSession) {
    Vibration.vibrate(1000)
  } else {
    Vibration.vibrate(0)
  }

  return (
    <>
      <IonAlert
        isOpen={incomingSession !== null}
        header={"Incoming Call"}
        subHeader={incomingSession && `From internal ${incomingSession.assertedIdentity?.displayName}`}
        cssClass="home-call-alert"
        buttons={[
          rejectCallBtn,
          answerCallBtn
        ]}
      />
      <IonModal
        cssClass='modal-background'
        onDidDismiss={() => dispatch(clearIncomingSession())}
        isOpen={sessionState === "Establishing" || sessionState === "Established"}
      >
        <ModalCall incomingSession={incomingSession} />
      </IonModal>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle size='small' slot='start' >
              Registrado: {user}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-justify-content-center" color="primary">
          <CallLog />
          <IonFab
            hidden={showKeypad}
            className='ion-padding-vertical'
            vertical="bottom"
            horizontal="end"
          >
            <IonFabButton onClick={() => setShowKeypad(true)} color="secondary">
              <IonIcon icon={keypad} />
            </IonFabButton>
          </IonFab>
          <div hidden={!showKeypad} className="home-complete-keypad">
            <IonItem style={{ margin: 0 }} color="secondary" >
              <IonIcon
                className="home-forward-icon"
                onClick={() => setShowKeypad(false)}
                icon={chevronForwardCircleOutline}
              />
              <IonInput
                className="home-input-keypad"
                value={inputValue}
                onIonChange={handleInputChange}
                clearInput
                readonly
                type="number"
                color="primary"
                placeholder="Ingrese numero de telefono"
              />
            </IonItem>
            <KeyPad
              handleBackspace={handleBackspace}
              handleCall={handleCall}
              setInputValue={setInputValue}
            />
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}

export default Home;
