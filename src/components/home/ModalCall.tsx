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
import { startHangupCall } from '../../actions/sip'
import { RootState } from '../../store/store'


const ModalCall = ({ incomingSession }) => {
  const dispatch = useDispatch()
  const { sessionState, extensionToCall, outgoingSession } = useSelector((state: RootState) => state.sip)

  const handleHangup = () => {
    if (outgoingSession) {
      dispatch(startHangupCall(outgoingSession, sessionState))
    } else dispatch(startHangupCall(incomingSession, sessionState))
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
            <IonFab horizontal="center" >
              <IonFabButton color="primary" className="modal-fab-button" >
                <IonIcon size="large" icon={volumeHighOutline} />
              </IonFabButton>
            </IonFab>
          </IonCol>
          <IonCol >
            <IonFab horizontal="center" >
              <IonFabButton color="primary" className="modal-fab-button" >
                <IonIcon size="large" icon={micOutline} />
              </IonFabButton>
            </IonFab>
          </IonCol>
          <IonCol>
            <IonFab horizontal="center" >
              <IonFabButton color="primary" className="modal-fab-button" >
                <IonIcon size="large" icon={keypad} />
              </IonFabButton>
            </IonFab>
          </IonCol>
        </IonRow>
        <IonRow className="modal-row" >
          <IonCol  >
            <IonFab horizontal="center" color="danger" >
              <IonFabButton onClick={handleHangup} className="modal-fab-button" color="danger" >
                <IonIcon className="icon-transform" icon={callSharp} />
              </IonFabButton>
            </IonFab>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  )
}

export default ModalCall
