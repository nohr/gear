import { useContext } from "react";
import { MenuContext } from "context";
import { LogoPath } from "./ModalButtonPaths";

export function MenuToggle() {
  const { menu, setMenu } = useContext(MenuContext);

  return (
    <svg
      onClick={() => setMenu(!menu)}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 300 246.9"
      xmlSpace="preserve"
      className={`${
        !menu
          ? " fill-blue-500 stroke-transparent hover:fill-red-500 dark:fill-gray-500 dark:hover:fill-lime-500"
          : " fill-transparent stroke-red-500 drop-shadow-mdHover dark:stroke-lime-500 dark:drop-shadow-mdDarkHover"
      } menuToggle`}
      style={{ transform: "translateX(-50%)" }}
    >
      {LogoPath}
    </svg>
  );
}
