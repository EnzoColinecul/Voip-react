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
import { startCall, startAcceptCall, startRejectCall } from '../../actions/sip'
import { finishAlert, setError, startAlert } from '../../actions/ui'
import { RootState } from '../../store/store';
import ExploreContainer from '../../components/ExploreContainer';
import KeyPad from '../../components/home/KeyPad';
import ModalCall from '../../components/home/ModalCall';
import './Home.css';

const HomeCopy: React.FC = () => {

  const [inputValue, setInputValue] = useState<string | null>('')
  const { msgError, showAlert } = useSelector((state: RootState) => state.ui)
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
    handler: handlerRejectCall
  }

  const answerCallBtn = {
    text: 'Accept',
    handler: handleAnswerCall
  }

  return (
    <>
      <IonAlert
        isOpen={incomingSession !== null}
        header={'Incoming Call'}
        subHeader={incomingSession && `From internal ${incomingSession.assertedIdentity?.displayName}`}
        cssClass='my-custom-class '
        buttons={[
          rejectCallBtn,
          answerCallBtn
        ]}
      />
      <IonModal isOpen={sessionState === 'Establishing' || sessionState === 'Established'}>
        <ModalCall incomingSession={incomingSession} />
      </IonModal>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <div className="header-container">
              <IonTitle >
                Status: Online
              </IonTitle>
              <IonIcon size="small" color="success" icon={ellipseSharp} />
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-justify-content-center" color="primary"  >
          <IonItem color="light" >
            <IonInput
              className="input-keypad"
              value={inputValue}
              onIonChange={handleInputChange}
              type="number"
              color="dark"
              placeholder="Ingrese numero de telefono"
              clearInput
            />
          </IonItem>
          <div className='home-keypad-container'>
            <KeyPad setInputValue={setInputValue} handleCall={handleCall} />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default HomeCopy;
