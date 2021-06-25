import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonText } from '@ionic/react'
import { arrowBackOutline, arrowRedo, callSharp } from 'ionicons/icons'
import React from 'react'

const CallLog = () => {

  const log = [
    { type: 'answered', number: 103, duration: 10 },
    { type: 'not answered', number: 104, duration: 0 },
    { type: 'answered', number: 104, duration: 0 },
    { type: 'answered', number: 103, duration: 0 },
    { type: 'answered', number: 104, duration: 0 },
    { type: 'answered', number: 105, duration: 0 }

  ]

  return (
    <IonContent>
      <IonList>
        <IonListHeader className="ion-padding-end">
          <IonLabel>Call Registers</IonLabel>
        </IonListHeader>
        {log.map((data, index) => (
          <IonItem key={index}>
            <IonLabel className="call-log-label" >
              <IonText>
                {data.number}
              </IonText>
              <IonRow className="ion-align-items-center">
                <IonIcon
                  className="ion-margin-horizontal call-log-arrow-incoming"
                  icon={data.type === "not answered" ? arrowRedo : arrowBackOutline}
                  color={data.type === "not answered" ? "danger" : "success"}
                />
                <h2 className="ion-margin-horizontal" color="primary-shade">{data.type}</h2>
                <h2 style={{ color: 'gray' }} className="ion-padding-horizontal">12:45 Am</h2>
                <IonButton
                  className="ion-margin-horizontal ion-justify-content-end"
                  shape="round"
                  color="secondary"
                >
                  <IonIcon icon={callSharp} />
                </IonButton>
              </IonRow>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  )
}

export default CallLog
