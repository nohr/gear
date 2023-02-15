import { useUIStore } from "state/ui";
import "styles/styles.modals.css";
import { GearPath } from "./ModalPaths";

export { ReadMe } from "./ReadMe";
export { Feedback } from "./Feedback";

export function Backdrop() {
  const hideReadme = useUIStore((state) => state.hideReadme);
  const hideFeedback = useUIStore((state) => state.hideFeedback);

  const handleClick = (e: MouseEvent) => {
    const elem = e.target as HTMLDivElement;
    if (elem.classList.contains("backdrop")) {
      hideReadme();
      hideFeedback();
    }
  };
  return (
    <div
      onClick={(e) => handleClick(e as unknown as MouseEvent)}
      className="backdrop absolute top-0 left-0 z-40 h-full w-full cursor-alias bg-white bg-opacity-25 dark:bg-black-500 dark:bg-opacity-25"
    />
  );
}

export function Gear({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 658.2 326"
      xmlSpace="preserve"
      className={className}
    >
      {GearPath}
    </svg>
  );
}
