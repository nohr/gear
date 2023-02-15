import Composition from "3D/Canvas";
import { useEffect } from "react";
import { useUIStore } from "state/ui";
import Camera from "./Camera";

export default function Bind() {
  const setTheme = useUIStore((state) => state.setTheme);
  // an event lister that changes the theme when the user changes the theme in the OS
  useEffect(() => {
    const handleThemeChange = () => {
      const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setTheme(theme);
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleThemeChange);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleThemeChange);
  }, [setTheme]);

  return (
    <>
      <Camera />
      <Composition />
    </>
  );
}
