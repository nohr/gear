import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
interface InfoProps {
  name: string;
  version: string;
  description: string;
  github: string;
  email: string;
  website: string;
}

export const useInfoStore = create<InfoProps>(() => ({
  name: "Aite Aigbe",
  version: "0.0.1",
  description: "A simple, lightweight, and fast game using 3D pose estimation.",
  github: "https://github.com/nohr/gear",
  email: "aiteaigbe@gmail.com",
  website: "https://aite.fyi",
}));

export interface UIProps {
  fullscreen: boolean;
  setFullscreen: () => void;
  feedback: boolean;
  setFeedback: (bool?: boolean) => void;
  menu: boolean;
  setMenu: () => void;
  readme: boolean;
  setReadme: (bool?: boolean) => void;
  readMeText: string;
  getReadMe: (md: string) => Promise<void>;
  status: string | JSX.Element;
  /**
   * Sets the status message in the menu.
   *
   * @param status The status message which may be a string or JSX.Element.
   */
  setStatus: (status: string | JSX.Element) => void;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  webcamAccess: boolean;
  setWebcamAccess: (bool: boolean) => void;
}
let time: NodeJS.Timeout | undefined;

export const useUIStore = create<UIProps>()(
  devtools(
    persist(
      (set, get) => ({
        fullscreen: false,
        setFullscreen: () => {
          !get().fullscreen
            ? get().setStatus("entering fullscreen")
            : get().setStatus("exiting fullscreen");
          get().fullscreen
            ? document.exitFullscreen()
            : document.documentElement.requestFullscreen({
                navigationUI: "hide",
              });
          set((state: UIProps) => ({ fullscreen: !state.fullscreen }));
        },
        feedback: false,
        setFeedback: (bool = !get().feedback) =>
          set(() => ({
            feedback: bool,
            readme: false,
          })),
        menu: true,
        setMenu: () => set((state: UIProps) => ({ menu: !state.menu })),
        readme: false,
        setReadme: (bool = !get().readme) =>
          set(() => ({
            readme: bool,
            feedback: false,
          })),
        readMeText: "",
        getReadMe: async (md) => {
          const readMeText = await fetch(md, {
            method: "GET",
            mode: "cors",
            cache: "default",
            headers: {
              "Content-Type": "text/plain",
            },
          }).then((text) => text.text());
          set({ readMeText });
        },
        status: "Press space to start",
        setStatus: (status: UIProps["status"]): void => {
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
        setTheme: (theme: UIProps["theme"]) =>
          set(() => ({
            theme,
          })),
        webcamAccess: false,
        setWebcamAccess: (bool: boolean) => set(() => ({ webcamAccess: bool })),
      }),
      {
        name: "ui",
      },
    ),
  ),
);
