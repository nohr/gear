import { HolisticContext } from "context";
import { useContext, useEffect } from "react";
import { state } from "state";
import { useSnapshot } from "valtio";
// import { handleHandtrack } from "./handtrack.setup";

export default function Cameras() {
  const { playing, cameraStarted } = useSnapshot(state);
  const { input, init, run, destroy, holistic } = useContext(HolisticContext);

  useEffect(() => {
    if (cameraStarted && !holistic.current) init();
    if (playing) run();
  }, [cameraStarted, holistic.current, playing]);

  useEffect(() => {
    return () => {
      if (holistic.current) destroy();
    };
  }, [cameraStarted]);

  return (
    <video
      autoPlay
      width="640"
      height="480"
      ref={input}
      className="input_video hidden"
    ></video>
  );
}
