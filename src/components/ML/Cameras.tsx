import Webcam from "react-webcam";
import { state } from "state";
import { useSnapshot } from "valtio";
import { activateDraw } from "./utils";

export default function Cameras() {
  const { cameraStarted } = useSnapshot(state);
  return (
    <>
      {cameraStarted ? (
        <>
          {/* MediaPipe Camera */}
          <Webcam width={640} height={480} className="input_video" />
          {/* Handtrack js Camera */}
          <Webcam
            width={640}
            height={480}
            className="input_video2 "
            onLoadedData={() => {
              state.cameraLoaded = true;
            }}
          />
          <canvas className="guides" ref={(e: any) => activateDraw(e)}></canvas>
        </>
      ) : null}
    </>
  );
}
