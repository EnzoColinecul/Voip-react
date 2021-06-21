import {
  IonButton,
  IonButtons,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow
} from '@ionic/react'
import { backspace, callSharp } from 'ionicons/icons'
import React from 'react'

type HomeProps = {
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  handleBackspace: () => void,
  handleCall: () => void
}

const KeyPad = ({ setInputValue, handleCall, handleBackspace }: HomeProps) => {

  const numbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

  return (
    <>
      <div className="keypad-row"  >
        {numbers[0].map(number => (
          <IonButton
            expand="full"
            onClick={() => setInputValue(prevState => prevState + number.toString())}
            className="keypad-button"
            key={number}
          >
            {number}
          </IonButton>
        ))
        }
      </div>
      <div className="keypad-row" >
        {numbers[1].map(number => (
          <IonButton
            expand="full"
            onClick={() => setInputValue(prevState => prevState + number.toString())}
            className="keypad-button"
            key={number}
          >
            {number}
          </IonButton>
        ))
        }
      </div >
      <div className="keypad-row" >
        {numbers[2].map(number => (
          <IonButton
            expand="full"
            onClick={() => setInputValue(prevState => prevState + number.toString())}
            className="keypad-button"
            key={number}
          >
            {number}
          </IonButton>
        ))
        }
      </div>
      <div className="keypad-row" >
        <div className="keypad-button-call-container">
          <IonButton
            shape="round"
            expand="block"
            color="secondary"
            size="small"
            className="keypad-button keypad-button-call-color "
            onClick={handleCall}
          >
            <IonIcon size="extralarge" icon={callSharp} />
          </IonButton>
        </div>
        <IonButton
          expand="full"
          onClick={() => setInputValue(prevState => prevState + "0")}
          className="keypad-button"
        >
          0
        </IonButton>
        <IonButton onClick={handleBackspace} className="keypad-button" >
          <IonIcon color="secondary" icon={backspace} />
        </IonButton>
      </div>
    </>
  )
}

export default KeyPad
