import { useEffect } from "react";
import { useGameStore } from "state/game";
import { useModelStore } from "state/model";
import { useUIStore } from "state/ui";

export default function Camera() {
  const [
    get_input,
    start_input,
    stop_input,
    setResults,
    selfie,
    input,
    holistic,
  ] = useModelStore((state) => [
    state.get_input,
    state.start_input,
    state.stop_input,
    state.setResults,
    state.selfie,
    state.input,
    state.holistic,
  ]);
  const setStatus = useUIStore((state) => state.setStatus);
  const playing = useGameStore((state) => state.playing);

  useEffect(() => {
    get_input(document.querySelector("video.input_video") as HTMLVideoElement);
  }, []);

  useEffect(() => {
    if (!playing) setStatus("Press space to start");
  }, [playing]);

  useEffect(() => {
    if (playing) {
      start_input();

      if (holistic) {
        holistic.onResults(setResults);
        setStatus("running holisitic");
      }
    } else if (input) {
      stop_input();
    }
  }, [holistic, playing]);

  return (
    <video
      width="1280"
      height="720"
      className={`input_video absolute opacity-20 ${
        !selfie ? "-scale-x-100" : " scale-x-100"
      } ${
        // playing ? "" :
        "hidden"
      }`}
    ></video>
  );
}
