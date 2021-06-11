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

const Home: React.FC = () => {

  const [inputValue, setInputValue] = useState<string | null>('')
  const { msgError, showAlert } = useSelector((state: RootState) => state.ui)
  const { incomingSession } = useSelector((state: RootState) => state.sip)

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
      <IonModal isOpen={true}>
        <ModalCall/>
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
          <IonCard className="md ion-margin-horizontal" >
            <IonCardContent>
              <IonCardHeader >
                <IonButton
                  fill="clear"
                >
                  <IonIcon color="dark" icon={settingsSharp}></IonIcon>
                </IonButton>
              </IonCardHeader>
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
              <IonGrid size-md="6">
                <div className="keypad-container">
                  <KeyPad setInputValue={setInputValue} handleCall={handleCall} />
                </div>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
