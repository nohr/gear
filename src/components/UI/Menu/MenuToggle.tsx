import { LogoPath } from "./ModalButtonPaths";
import { useGameStore } from "state/game";
import { useUIStore } from "state/ui";

export default function MenuToggle() {
  const playing = useGameStore((state) => state.playing);
  const setMenu = useUIStore((state) => state.setMenu);
  const menu = useUIStore((state) => state.menu);
  return (
    <svg
      onClick={setMenu}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 300 246.9"
      xmlSpace="preserve"
      className={`${playing ? "animate-bounce hover:animate-none" : ""} ${
        !menu
          ? " fill-blue-500 stroke-transparent drop-shadow-md hover:fill-red-500 dark:fill-gray-500 dark:drop-shadow-mdDark dark:hover:fill-lime-500"
          : " fill-transparent stroke-red-500 drop-shadow-mdHover dark:stroke-lime-500 dark:drop-shadow-mdDarkHover"
      } absolute top-3 z-50 aspect-square h-8 w-auto origin-[50%_52%] cursor-pointer select-none overflow-visible transition-[0.2s] hover:drop-shadow-mdHover  hover:dark:drop-shadow-mdDarkHover`}
    >
      {LogoPath}
    </svg>
  );
}
