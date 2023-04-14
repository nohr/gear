import { create } from "zustand";

interface GameProps {
  panel: boolean;
  setPanel: (bool?: boolean) => void;
  stage: number;
  started: boolean;
  playing: boolean;
  ready: boolean;
  start: () => void;
  stop: () => void;
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
  start: () => set({ playing: true, stage: 1, started: true }),
  stop: () => set({ playing: false, stage: 0, started: false }),
  play: () => set({ playing: true }),
  pause: () => set({ playing: false }),
  setPlay: (bool) =>
    set((state) => ({ playing: bool ? bool : !state.playing })),
}));
