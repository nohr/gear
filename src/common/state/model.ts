import { Camera } from "@mediapipe/camera_utils";
import { Holistic } from "@mediapipe/holistic";
import { create } from "zustand";

interface ModelProps {
  /**
   * The camera instance.
   * @type {Camera}
   * @see https://google.github.io/mediapipe/solutions/camera_utils#javascript-solution-api
   *
   *
   */
  camera: Camera | null;
  /**
   * The Holistic model instance.
   * @type {Holistic}
   * @see https://google.github.io/mediapipe/solutions/holistic#javascript-solution-api
   *
   */
  holistic: Holistic | null;
  /**
   * Kills the holistic model.
   * @type {() => void}
   */
  kill_holistic: () => void;
  /**
   * The Pose model results instance.
   * @type {Results}
   * @see {@link @mediapipe/holistic/index.d.ts}
   */
  results: Results | null;
  setResults: (results: Results) => void;
  selfie: boolean;
  setSelfie: () => void;
  input: HTMLVideoElement | null;
  get_input: (input: HTMLVideoElement) => void;
  start_input: () => void;
  stop_input: () => void;
  stage?: number;
}

export const useModelStore = create<ModelProps>()((set, get) => ({
  camera: null,
  holistic: null,
  kill_holistic: () => set({ holistic: null, camera: null, results: null }),
  results: null,
  setResults: (results) => set({ results }),
  selfie: false,
  setSelfie: () => set((state) => ({ selfie: !state.selfie })),
  input: null,
  get_input: (input) => set({ input }),
  start_input: () => {
    // Enable camera if it exists
    if (get().input?.srcObject)
      (<MediaStream>get().input?.srcObject).getVideoTracks()[0].enabled = true;
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: 1280,
          height: 720,
          facingMode: `${get().selfie ? "user" : "environment"}`,
        },
      })
      .then((stream) => {
        (<HTMLVideoElement>get().input).srcObject = stream;
        // init holistic
        if (get().holistic) {
          get().holistic?.reset();
          return;
        }
        set(() => ({
          holistic: new Holistic({
            locateFile: (file: string) => {
              return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
            },
          }),
        }));
        // Set holistic options
        get().holistic?.setOptions({
          selfieMode: get().selfie,
          modelComplexity: 2,
          smoothLandmarks: true,
          minDetectionConfidence: 0.15,
          minTrackingConfidence: 0.15,
          enableFaceGeometry: false,
          refineFaceLandmarks: false,
          enableSegmentation: false,
          smoothSegmentation: false,
        });
        // Use `Mediapipe` utils to get camera - lower resolution = higher fps
        set((state) => ({
          camera: new Camera(state.input as HTMLVideoElement, {
            onFrame: async () => {
              await state.holistic?.send({
                image: state.input as HTMLVideoElement,
              });
            },
            width: 1280,
            height: 720,
            facingMode: `${state.selfie ? "user" : "environment"}`,
          }),
        }));
        get()
          .camera?.start()
          .catch((err: Error) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  stop_input: () => {
    (<MediaStream>get().input?.srcObject)?.getVideoTracks()[0].stop();
    get().camera?.stop();
  },
}));
