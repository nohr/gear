import { Camera } from "@mediapipe/camera_utils";
import { Holistic, Results } from "@mediapipe/holistic";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { state } from "state";
import { useSnapshot } from "valtio";

export const HolisticContext = createContext<HolisticProps>({
  input: null,
  init: () => {},
  run: () => {},
  destroy: () => {},
  holistic: null,
  results: null,
});

export function HolisticProvider({ children }: { children: ReactNode }) {
  const input = useRef<HTMLVideoElement>(null!);
  const camera = useRef<Camera>();
  const holistic = useRef<Holistic>();
  const results = useRef<any>(null!);
  const { playing, selfie } = useSnapshot(state);

  // Webcam
  const startCam = useCallback(
    () =>
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            width: 640,
            height: 480,
            facingMode: `${selfie ? "user" : "environment"}`,
          },
        })
        .then((stream) => {
          console.log("starting webcam");
          input.current.srcObject = stream;
        })
        .catch((err) => {
          console.error(err);
        }),
    [selfie]
  );

  useEffect(() => {
    if (input.current)
      if (playing) startCam();
      else {
        console.log("stopping webcam");
        input.current.srcObject = null;
        input.current.pause();
      }
  }, [playing, selfie, input.current]);

  const init = useCallback(() => {
    /* SETUP MEDIAPIPE HOLISTIC */
    holistic.current = new Holistic({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      },
    });
    // Set holistic options
    holistic.current.setOptions({
      selfieMode: state.selfie,
      modelComplexity: 1,
      // upperBodyOnly: false,
      smoothLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
      refineFaceLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
    });

    // Use `Mediapipe` utils to get camera - lower resolution = higher fps
    if (!input.current) return;
    camera.current = new Camera(input.current, {
      onFrame: async () => {
        await holistic.current?.send({
          image: input.current,
        });
      },
      width: 640,
      height: 480,
      facingMode: `${selfie ? "user" : "environment"}`,
    });
    camera.current.start();

    if (camera.current) {
      console.log("init holistic");
      state.status = "Holistic loaded";
    }
  }, [selfie]);

  const onResults = (e: Results) => {
    //   if (
    //     model.model &&
    //     !model.location[0] &&
    //     !model.location[1] &&
    //     state.status !== "Ready"
    //   ) {
    //     state.status = "Ready";
    //     state.gameReady = true;
    //   }
    results.current = e;
  };

  const run = () => {
    if (!holistic.current) return;
    holistic.current.onResults(onResults);
    console.log("run holistic");
  };

  const destroy = useCallback(() => {
    console.log("destroy holistic");
    camera.current?.stop();
  }, []);
  return (
    <HolisticContext.Provider
      value={{ input, init, run, destroy, holistic, results }}
    >
      {children}
    </HolisticContext.Provider>
  );
}
