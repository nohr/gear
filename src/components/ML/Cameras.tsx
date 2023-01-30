import Webcam from "react-webcam";
import { state } from "state";
import { activateDraw } from "./utils";

export default function Cameras() {
  return (
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
  );
}
