import { useEffect } from "react";
import { useGameStore } from "state/game";
import { useModelStore } from "state/model";
import { useUIStore } from "state/ui";

export default function Camera() {
  const get_input = useModelStore((state) => state.get_input);
  const start_input = useModelStore((state) => state.start_input);
  const stop_input = useModelStore((state) => state.stop_input);
  const setResults = useModelStore((state) => state.setResults);
  const setStatus = useUIStore((state) => state.setStatus);
  const selfie = useModelStore((state) => state.selfie);
  const input = useModelStore((state) => state.input);
  const holistic = useModelStore((state) => state.holistic);
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
