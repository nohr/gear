/**
 * Dangerous MediaPipe workaround!
 *
 */
interface Results {
  poseLandmarks: NormalizedLandmarkList;
  faceLandmarks: NormalizedLandmarkList;
  multiFaceGeometry: FaceGeometry[];
  rightHandLandmarks: NormalizedLandmarkList;
  leftHandLandmarks: NormalizedLandmarkList;
  segmentationMask: GpuBuffer;
  image: GpuBuffer;
  za?: NormalizedLandmarkList;
}

interface ModelProps {
  /**
   * The camera instance.
   * @type {Camera}
   * @see https://google.github.io/mediapipe/solutions/camera_utils#javascript-solution-api
   *
   *
   */
  camera: Camera;
  /**
   * The Holistic model instance.
   * @type {Holistic}
   * @see https://google.github.io/mediapipe/solutions/holistic#javascript-solution-api
   *
   */
  holistic: Holistic | undefined;
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

interface InfoProps {
  name: string;
  version: string;
  description: string;
  github: string;
  twitter: string;
  linkedin: string;
  email: string;
  website: string;
  fullscreen: boolean;
  setFullscreen: () => void;
}
interface UIProps {
  feedback: boolean;
  hideFeedback: () => void;
  setFeedback: () => void;
  menu: boolean;
  setMenu: () => void;
  readme: boolean;
  hideReadme: () => void;
  setReadme: () => void;
  status: string | JSX.Element;
  /**
   * Sets the status message in the menu.
   *
   * @param status The status message which may be a string or JSX.Element.
   */
  setStatus: (status: string | JSX.Element) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}
