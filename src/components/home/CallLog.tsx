import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow, IonText } from '@ionic/react'
import { arrowBackOutline, callSharp } from 'ionicons/icons'
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
            <IonLabel >
              <IonText className="ion-padding-horizontal">
                {data.number}
              </IonText>
              <IonRow className="ion-align-items-center ion-justify-content-between">
                <IonIcon className="ion-padding-horizontal" icon={arrowBackOutline} />
                <h2 color="primary-shade">{data.type}</h2>
                <h3>12:45 Am</h3>
                <IonButton
                  className=""
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
