import { Camera } from "@mediapipe/camera_utils";
import { Holistic } from "@mediapipe/holistic";
import { create } from "zustand";

export const useModelStore = create<ModelProps>()((set, get) => ({
  camera: null,
  holistic: undefined,
  kill_holistic: () => {
    set(() => ({ holistic: null, camera: null, results: null }));
  },
  results: null,
  setResults: (results) => set({ results }),
  selfie: false,
  setSelfie: () => set((state) => ({ selfie: !state.selfie })),
  input: null,
  get_input: (input) => set({ input }),
  start_input() {
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
        if (get().holistic) return;
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
          modelComplexity: 1,
          smoothLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
          enableFaceGeometry: false,
          refineFaceLandmarks: false,
          enableSegmentation: false,
          smoothSegmentation: false,
        });
        // Use `Mediapipe` utils to get camera - lower resolution = higher fps
        set(() => ({
          camera: new Camera(get().input as HTMLVideoElement, {
            onFrame: async () => {
              await get().holistic?.send({
                image: get().input as HTMLVideoElement,
              });
            },
            width: 1280,
            height: 720,
            facingMode: `${get().selfie ? "user" : "environment"}`,
          }),
        }));
        get()
          .camera?.start()
          .catch((err: Error) => get().setError(err));
      })
      .catch((err) => get().setError(err));
  },
  stop_input() {
    (<MediaStream>get().input?.srcObject)?.getVideoTracks()[0].stop();
    get().camera?.stop();
  },
  error: null,
  setError: (error: Error) => set({ error }),
}));
