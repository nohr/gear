import { create } from "zustand";

export const useGameStore = create<GameProps>()((set) => ({
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
