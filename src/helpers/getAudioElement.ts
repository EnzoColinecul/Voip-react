
export const getAudioElement = (id: string): HTMLAudioElement => {
  const audioElement = document.getElementById(id)
  if (!(audioElement instanceof HTMLAudioElement)) {
    throw new Error("Element not found");
  }
  return audioElement
}