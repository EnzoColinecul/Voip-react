export const getAudio =  (tag: string): HTMLAudioElement => {
  const element =  document.querySelector(tag);
  if (!(element instanceof HTMLAudioElement)) {
    throw new Error(`Element "${tag}" not found or not an audio element.`);
  }
  return element;
}

export const getVideo = (id: string): HTMLVideoElement => {
  const element = document.getElementById(id);
  if (!(element instanceof HTMLVideoElement)) {
    throw new Error(`Element "${id}" not found or not an video element.`);
  }
  return element;
}