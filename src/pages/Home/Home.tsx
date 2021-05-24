import {
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
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { ellipseSharp, keypad, settingsSharp } from 'ionicons/icons';
import { useState } from 'react';
import ExploreContainer from '../../components/ExploreContainer';
import KeyPad from '../../components/home/KeyPad';
import './Home.css';

const Home: React.FC = () => {

  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    console.log(inputValue);
  }

  return (
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
                <IonIcon color='dark' icon={settingsSharp}></IonIcon>
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
            <IonGrid size-md='6'>
              <div className="keypad-container">
                <KeyPad setInputValue={setInputValue} />
              </div>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
