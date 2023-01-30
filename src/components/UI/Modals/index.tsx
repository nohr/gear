import "styles/styles.modals.css";
import { MenuContext } from "context";
import { Dispatch, SetStateAction, useContext } from "react";
import { GearPath } from "./ModalPaths";

export { ReadMe } from "./ReadMe";
export { Feedback } from "./Feedback";

const handleClick = (
  e: MouseEvent,
  setReadMe: Dispatch<SetStateAction<boolean>>,
  setFeedback: Dispatch<SetStateAction<boolean>>
) => {
  const elem = e.target as HTMLDivElement;
  if (elem.classList.contains("backdrop")) {
    setReadMe(false);
    setFeedback(false);
  }
};

export function Backdrop() {
  const { setFeedback, setReadMe } = useContext(MenuContext);
  return (
    <div
      onClick={(e: any) => handleClick(e, setFeedback, setReadMe)}
      className="backdrop absolute top-0 left-0 h-full w-full cursor-alias bg-white bg-opacity-25 dark:bg-black-500 dark:bg-opacity-25"
    />
  );
}

export function Gear() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 658.2 326"
      xmlSpace="preserve"
      className="pointer-events-none !fixed bottom-[40px] left-1/4 z-10 h-auto scale-150 overflow-hidden fill-blue-500 opacity-25 dark:fill-gray-500"
    >
      {GearPath}
    </svg>
  );
}
