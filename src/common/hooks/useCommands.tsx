import { useCallback, useEffect } from "react";
import { useGameStore } from "state/game";
import { useUIStore } from "state/ui";
import { useModelStore } from "state/model";

//  handle keyboard commands
export function useCommands() {
  const [playing, started, start, stop, setPlay] = useGameStore((state) => [
    state.playing,
    state.started,
    state.start,
    state.stop,
    state.setPlay,
  ]);
  const [setFullscreen, setStatus] = useUIStore((state) => [
    state.setFullscreen,
    state.setStatus,
  ]);

  const [selfie, setSelfie] = useModelStore((state) => [
    state.selfie,
    state.setSelfie,
    state.stop_input,
    state.kill_holistic,
  ]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "s")
        if (started) stop(setStatus);
        else start(setStatus);

      if (event.key === " ")
        if (started) setPlay();
        else start(setStatus);

      if (event.key === "f") setFullscreen();

      if (event.key === "l") {
        if (started) stop(setStatus);
        setSelfie();
        setStatus(
          <span>
            using <b>{selfie ? "Laptop" : "External"}</b> camera
          </span>,
        );
      }
      // ! debug
      //   console.log(
      //     `Key pressed: ${event.key}, playing: ${playing}, fullscreen: ${document.fullscreenElement}`
      //   );
    },
    [playing, selfie],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
}
