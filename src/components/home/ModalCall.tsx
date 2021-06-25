import React from 'react'
import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react"
import { callSharp, keypad, micCircle, micOutline, volumeHighOutline } from 'ionicons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { clearIncomingSession, startHangupCall } from '../../actions/sip'
import { RootState } from '../../store/store'


const ModalCall = ({ incomingSession }) => {
  const dispatch = useDispatch()
  const { sessionState, extensionToCall, outgoingSession } = useSelector((state: RootState) => state.sip)

  const handleHangup = () => {
    if (outgoingSession && incomingSession === null) {
      dispatch(startHangupCall(outgoingSession))
    } else {
      dispatch(startHangupCall(incomingSession))
    }
  }

  return (
    <IonContent className='modal-content' fullscreen={true}>
      <IonTitle className='modal-call-header-title' size='large' >
        {extensionToCall ?
          extensionToCall
          :
          incomingSession?.assertedIdentity?.displayName
        }
      </IonTitle>
      <div className="modal-call-title">
        <IonText>{sessionState}</IonText>
        {sessionState === "Establishing" &&
          <IonSpinner className="modal-call-tittle-spinner" name="dots" />
        }
      </div>
      <IonGrid>
        <IonRow className="modal-row" >
          <IonCol >
            <IonFab className="modal-fab" horizontal="center" >
              <IonFabButton color="primary" className="modal-fab-button" >
                <IonIcon size="large" icon={volumeHighOutline} />
              </IonFabButton>
              <IonLabel className="modal-label">
                Speaker
              </IonLabel>
            </IonFab>
          </IonCol>
          <IonCol >
            <IonFab className="modal-fab" horizontal="center" >
              <IonFabButton color="primary" className="modal-fab-button" >
                <IonIcon size="large" icon={micOutline} />
              </IonFabButton>
              <IonLabel className="modal-label">
                Mute
              </IonLabel>
            </IonFab>
          </IonCol>
          <IonCol>
            <IonFab className="modal-fab" horizontal="center" >
              <IonFabButton color="primary" className="modal-fab-button" >
                <IonIcon size="large" icon={keypad} />
              </IonFabButton>
              <IonLabel className="modal-label">
                Keypad
              </IonLabel>
            </IonFab>
          </IonCol>
        </IonRow>
        <IonRow className="modal-row" >
          <IonCol className="modal-col-right">
            <IonFab className="modal-fab " horizontal="center" color="danger" >
              <IonFabButton onClick={handleHangup} className="modal-fab-button" color="danger" >
                <IonIcon className="icon-transform" icon={callSharp} />
              </IonFabButton>
              <IonLabel className="modal-label">
                Hangup
              </IonLabel>
            </IonFab>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

export default ModalCall
