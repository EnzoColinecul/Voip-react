export const assignStream = (stream: MediaStream, element: HTMLAudioElement): void => {
  // Set element source.
  element.autoplay = true; // Safari does not allow calling .play() from a non user action
  element.srcObject = stream;

  // Load and start playback of media.
  element.play().catch((error: Error) => {
    console.error("Failed to play media");
    console.error(error);
  });

  // If a track is added, load and restart playback of media.
  stream.onaddtrack = (): void => {
    element.load(); // Safari does not work otheriwse
    element.play().catch((error: Error) => {
      console.error("Failed to play remote media on add track");
      console.error(error);
    });
  };

  // If a track is removed, load and restart playback of media.
  stream.onremovetrack = (): void => {
    element.load(); // Safari does not work otheriwse
    element.play().catch((error: Error) => {
      console.error("Failed to play remote media on remove track");
      console.error(error);
    })
  }
}