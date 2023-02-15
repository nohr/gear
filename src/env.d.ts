/// <reference types="astro/client" />

import type { MutableRefObject } from "react";

// Todo: Import breaking external types

interface HolisticProps {
  input: MutableRefObject<HTMLVideoElement>;
  /**
   * Initialize Holistic
   * @returns void
   *
   */
  init: () => void;
  /**
   * Run Holistic model on video stream from webcam
   * @returns void
   *
   */
  run: () => void;
  /**
   * Destroy Holistic model
   * @returns void
   *
   *
   */
  destroy: () => void;
  holistic: MutableRefObject<Holistic | null>;
  results: MutableRefObject<Results | null>;
}
interface VRMProps {
  /**
   * Animate VRM model with results from MediaPipe Holistic and input video element
   * @param vrm VRM model
   * @param results MediaPipe Holistic results ref
   * @param input Input video element ref
   * @delta delta time
   * @example animate(vrm, results, input);
   */
  animate: (
    vrm: VRM,
    results: any,
    input: HTMLVideoElement,
    delta: number
  ) => void;
  affect: (status: string) => void;
  load: (helperRoot: any) => void;
  vrm: VRM;
}
interface MenuProps {
  menu: boolean;
  setMenu: Dispatch<SetStateAction<boolean>>;
  menuRef: RefObject<HTMLDivElement>;
  readme: boolean;
  setReadMe: Dispatch<SetStateAction<boolean>>;
  feedback: boolean;
  setFeedback: Dispatch<SetStateAction<boolean>>;
}
