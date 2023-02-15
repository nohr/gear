import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const InfoStore = (set: any, get: any): InfoProps => ({
  name: "Paredol",
  version: "0.0.1",
  description:
    "A simple, lightweight, and fast web app for 3D pose estimation.",
  github: "   ",
  twitter: "   ",
  linkedin: "   ",
  email: "aite@paredol.com",
  website: "paredol.com",
  fullscreen: false,
  setFullscreen: () => {
    get().fullscreen
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen({ navigationUI: "hide" });
    set((state: InfoProps) => ({ fullscreen: !state.fullscreen }));
  },
});

export const useInfoStore = create(InfoStore);

let time: NodeJS.Timeout | undefined;
const UIStore = (set: any, get: any): UIProps => ({
  feedback: false,
  hideFeedback: () => set({ feedback: false }),
  setFeedback: () =>
    set((state: UIProps) => ({ feedback: !state.feedback, readme: false })),
  menu: true,
  setMenu: () => set((state: UIProps) => ({ menu: !state.menu })),
  readme: false,
  hideReadme: () => set({ readme: false }),
  setReadme: () =>
    set((state: UIProps) => ({ readme: !state.readme, feedback: false })),
  status: "Press space to start",
  setStatus(status: UIProps["status"]): void {
    clearTimeout(time);
    set(() => ({ status }));
    if (status !== "Press space to start")
      time = setTimeout(() => get().setStatus(" "), 3000);
  },
  theme:
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  setTheme(theme: UIProps["theme"]) {
    set(() => ({
      theme: theme,
    }));
  },
});

export const useUIStore = create(
  devtools(
    persist(UIStore, {
      name: "ui",
    })
  )
);
