import {
  IonAlert,
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
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar
} from '@ionic/react';
import { ellipseSharp, keypad, settingsSharp } from 'ionicons/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCall, startAcceptCall, startRejectCall, clearIncomingSession } from '../../actions/sip'
import { finishAlert, setError, startAlert } from '../../actions/ui'
import { RootState } from '../../store/store';
import ExploreContainer from '../../components/ExploreContainer';
import KeyPad from '../../components/home/KeyPad';
import ModalCall from '../../components/home/ModalCall';
import logo from '../../assets/images/voip-icon-v2.svg'
import './Home.css';

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | null>('')
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
        <IonContent className="ion-justify-content-center" color="primary"  >
          <div>
            <div className="home-complete-keypad">
              <IonItem color="secondary" >
                <IonInput
                  className="home-input-keypad"
                  value={inputValue}
                  onIonChange={handleInputChange}
                  type="number"
                  color="primary"
                  placeholder="Ingrese numero de telefono"
                  clearInput
                />
              </IonItem>
              <KeyPad setInputValue={setInputValue} handleCall={handleCall} />
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}

export default Home;
