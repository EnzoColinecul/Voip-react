import { IonButton, IonButtons, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react'
import { callSharp, laptop } from 'ionicons/icons'
import React from 'react'

type HomeProps = {
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  handleCall: () => void
}

const KeyPad = ({ setInputValue, handleCall }: HomeProps) => {

  const numbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  
  return (
    <IonGrid size-md='3'>
      <IonCol  >
        <IonRow className="ion-justify-content-center"  >
          {numbers[0].map(number => (
            <IonButton
              onClick={() => setInputValue(prevState => prevState + number.toString())}
              className="keypad-button"
              key={number}
            >
              {number}
            </IonButton>
          ))
          }
        </IonRow>
        <IonRow className="ion-justify-content-center" >
          {numbers[1].map(number => (
            <IonButton
              onClick={() => setInputValue(prevState => prevState + number.toString())}
              className="keypad-button"
              key={number}
            >
              {number}
            </IonButton>
          ))
          }
        </IonRow >
        <IonRow className="ion-justify-content-center" >
          {numbers[2].map(number => (
            <IonButton
              onClick={() => setInputValue(prevState => prevState + number.toString())}
              className="keypad-button"
              key={number}
            >
              {number}
            </IonButton>
          ))
          }
        </IonRow>
        <IonRow className="ion-justify-content-center keypad-row" >
          <IonButton 
          color="success" 
          className="keypad-button"
          onClick={handleCall}
          >
            <IonIcon  color="dark" icon={callSharp} />
          </IonButton>
          <IonButton
            onClick={() => setInputValue(prevState => prevState + "0")}
            className="keypad-button"
          >
            0
          </IonButton>
          <IonButton className="keypad-button" >
            <IonIcon icon={laptop} />
          </IonButton>
        </IonRow>
      </IonCol>
    </IonGrid>
  )
}

export default KeyPad
