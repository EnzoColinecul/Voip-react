import { Session, SessionState, Web } from "sip.js";
import { assignStream } from "./assignStream";

export const handleStateChanges = (
  session:Session,
  localHTMLMediaElement: HTMLAudioElement | HTMLVideoElement | null,
  remoteHTMLMediaElement: HTMLAudioElement | HTMLVideoElement | null
  ):void => {
    session.stateChange.addListener((state: SessionState) => { 
      console.error(state);
           
      switch (state) {
        case SessionState.Initial:
          break;
        case SessionState.Establishing:
          break;
        case SessionState.Established:
          const sessionDescriptionHandler = session.sessionDescriptionHandler;
          if (!sessionDescriptionHandler || !(sessionDescriptionHandler instanceof Web.SessionDescriptionHandler)) {
            throw new Error("Invalid session description handler.");
          }
          if (localHTMLMediaElement) {
            assignStream(sessionDescriptionHandler.localMediaStream, localHTMLMediaElement);
          }
          if (remoteHTMLMediaElement) {
            assignStream(sessionDescriptionHandler.remoteMediaStream, remoteHTMLMediaElement);
          }
          return SessionState.Established
          break;
        case SessionState.Terminating:
          break;
        case SessionState.Terminated:
          break;
        default:
          throw new Error("Unknown session state.");
      }
    })
}