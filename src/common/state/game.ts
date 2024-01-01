import { create } from "zustand";
import type { UIProps } from "./ui";

interface GameProps {
  panel: boolean;
  setPanel: (bool?: boolean) => void;
  stage: number;
  started: boolean;
  playing: boolean;
  ready: boolean;
  start: (setStatus: UIProps["setStatus"]) => void;
  stop: (setStatus: UIProps["setStatus"]) => void;
  play: () => void;
  pause: () => void;
  setPlay: (bool?: boolean) => void;
}

export const useGameStore = create<GameProps>()((set, get) => ({
  panel: false,
  setPanel: (bool = !get().panel) => set({ panel: bool }),
  stage: 0,
  started: false,
  playing: false,
  ready: false,
  start: (setStatus) => {
    setStatus("starting holistic");
    set({ playing: true, stage: 1, started: true });
  },
  stop: (setStatus) => {
    setStatus("stopping holistic");
    set({ playing: false, stage: 0, started: false });
  },
  play: () => set({ playing: true }),
  pause: () => set({ playing: false }),
  setPlay: (bool = !get().playing) => set({ playing: bool }),
}));
