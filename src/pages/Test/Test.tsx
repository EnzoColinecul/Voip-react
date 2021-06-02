import React, { ComponentProps, FunctionComponent, SetStateAction, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Invitation,
  InvitationAcceptOptions,
  Inviter,
  Referral,
  Registerer,
  SessionState,
  Session,
  UserAgent,
  UserAgentOptions,
  Ack
} from 'sip.js'
import { IncomingRequestMessage } from 'sip.js/lib/core'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  useIonToast
} from '@ionic/react'
import { getAudio, getVideo } from '../../helpers/getElements'
import {ws_domain} from '../../server/domain'
import './Test.css'

export interface LoginSettings {
  settingsLog: any;
  showSettings: boolean;
  errors: any;
  name?: string | null;
}

const Test = () => {

  const [present, dismiss] = useIonToast();

  async function playAudio() {
    try {
      await audio.play().then((e) => {
      })
    } catch (error) {
      console.log(error);
    }
  }

  const audio = getAudio("audio")


  const transportOptions = {
    server: ws_domain
  }

  const uri = UserAgent.makeURI('sip:103@192.168.1.10:8088')

  if (!uri) {
    throw new Error('Failed to create URI');
  }

  const userAgentOptions: UserAgentOptions = {
    uri,
    transportOptions,
    authorizationPassword: 'enzo103',
    authorizationUsername: '103',
    displayName: '103',

    /* ... */
  };
  const userAgent = new UserAgent(userAgentOptions);
  const registerer = new Registerer(userAgent);


  userAgent.delegate = {
    onInvite(invitation: Invitation): void {
      // An Invitation is a Session
      const incomingSession = invitation;

      if (incomingSession.state === 'Initial') {
        present("Incoming Call...")

        const testAudio = document.getElementById("test-audio")
        testAudio.onplay = (e) => {
          e.preventDefault()
          playAudio().then(() => {
            console.log('Ring Ring')

          }).catch(error => console.log(error))
        }
        console.log(testAudio)

      }

      incomingSession.delegate = {
        // Handle incoming REFER request.
        onRefer(referral: Referral): void {
          // ...
        },
      };

      // Handle incoming INVITE request.
      let constrainsDefault = {
        audio: true,
        video: false,
        render: {
          remote: {
            audio: audio
          }
        }
      }

      const options: InvitationAcceptOptions = {
        sessionDescriptionHandlerOptions: {
          constraints: constrainsDefault,
        }
      }
      console.log("newstate asdsad", incomingSession.state);

      incomingSession.stateChange.addListener((newState: SessionState) => {
        console.log("newstate", newState);
        switch (newState) {
          case SessionState.Initial:

            break;
          case SessionState.Establishing:
            // Session is establishing.
            break;
          case SessionState.Established:
            // Session has been established.
            break;
          case SessionState.Terminated:
            // Session has terminated.
            break;
          default:
            break;
        }
      });

    }
  };

  userAgent.start().then(() => {
    registerer.register()
    const target = UserAgent.makeURI("sip:104@192.168.1.10:8088");
    if (!target) {
      throw new Error("Failed to create target URI.")
    }

    const inviter = new Inviter(userAgent, target)

    const outgoingSession = inviter

    outgoingSession.delegate = {
      // Handle incoming REFER request.
      onRefer(referral: Referral): void {
        // ...
      }
    };

    // Handle outgoing session state changes.
    outgoingSession.stateChange.addListener((newState: SessionState) => {
      switch (newState) {
        case SessionState.Establishing:
          // Session is establishing.
          break;
        case SessionState.Established:
          // Session has been established.
          break;
        case SessionState.Terminated:
          // Session has terminated.
          break;
        default:
          break;
      }
    });

    // Send the INVITE request
    inviter.invite()
      .then(() => {
        // INVITE sent
      })
      .catch((error: Error) => {
        // INVITE did not send
      });

    // Send an outgoing REFER request
    const transferTarget = UserAgent.makeURI("sip:transfer@example.com");

    if (!transferTarget) {
      throw new Error("Failed to create transfer target URI.");
    }

   
  })
  return (
    <>
      <audio id="test-audio" autoPlay loop></audio>
      <IonContent color='primary'>
        <IonCard>
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle> Test</IonCardTitle>
            </IonCardHeader>
            <IonGrid size-md='6'>
              <IonRow >
                <IonCol  >
                  <IonLabel color='primary'>Ingrese Datos de Usuario</IonLabel>
                  <IonItem color='light'>
                    <IonInput
                      name='display_name'
                      type='email'
                      placeholder='Username'
                      required
                      clearInput
                    />
                  </IonItem>
                  <IonLabel color='primary'>Ingrese Contraseña</IonLabel>
                  <IonItem color='light'>
                    <IonIcon color='light' name="eye-outline"></IonIcon>
                    <IonInput
                      name='password'
                      type='password'
                      placeholder='Ej: 101extension'
                      required
                      clearInput

                    />
                  </IonItem>
                  <IonLabel>
                  </IonLabel>
                  <IonButton
                    expand='block'
                  >
                    Atender
                </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </>
  )
}

export default Test

