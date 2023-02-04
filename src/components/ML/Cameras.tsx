import type { VRM } from "@pixiv/three-vrm";
import { VRMContext } from "context";
import { useContext } from "react";
import Webcam from "react-webcam";
import { state } from "state";
import { useSnapshot } from "valtio";
import { handleHandtrack } from "./handtrack.setup";
import { handleHolistic } from "./holistic.setup";

const activateDraw = (ref: HTMLCanvasElement, vrm: { current: VRM }) => {
  const hollisticInput = document.querySelector(".input_video");
  const handtrackInput = document.querySelector(".input_video2");

  handleHolistic(vrm, hollisticInput as HTMLVideoElement);
  handleHandtrack(handtrackInput as HTMLVideoElement);
};

export default function Cameras() {
  const { cameraStarted } = useSnapshot(state);
  const { vrm } = useContext(VRMContext);
  return (
    <>
      {cameraStarted ? (
        <>
          {/* MediaPipe Camera */}
          <Webcam width={640} height={480} className="input_video hidden" />
          {/* Handtrack js Camera */}
          <Webcam
            width={640}
            height={480}
            className="input_video2 hidden"
            onLoadedData={() => {
              state.cameraLoaded = true;
            }}
          />
          <canvas
            className="guides"
            ref={(e: any) => activateDraw(e, vrm)}
          ></canvas>
        </>
      ) : null}
    </>
  );
}
