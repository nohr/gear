import { FeedbackPath, ReadMePath } from "./ModalButtonPaths";
import { useUIStore } from "state/ui";
import { GrClose } from "react-icons/gr";
import type { ReactNode } from "react";
import { shallow } from "zustand/shallow";

export default function ModalButtons() {
  const [readme, feedback, setReadme, setFeedback] = useUIStore(
    (state) => [
      state.readme,
      state.feedback,
      state.setReadme,
      state.setFeedback,
    ],
    shallow
  );
  return (
    <div className="flex w-36 flex-row justify-between gap-x-8">
      <IconButton
        bool={readme}
        altBool={feedback}
        setBool={setReadme}
        svgPath={ReadMePath}
      >
        README
      </IconButton>
      <IconButton
        bool={feedback}
        altBool={readme}
        setBool={setFeedback}
        svgPath={FeedbackPath}
      >
        Feedback
      </IconButton>
    </div>
  );
}
function IconButton({
  bool,
  altBool,
  setBool,
  svgPath,
  children,
}: {
  bool: boolean;
  altBool: boolean;
  setBool: (bool?: boolean) => void;
  svgPath: JSX.Element;
  children: ReactNode;
}) {
  return (
    <div
      onClick={() => (!altBool ? setBool() : null)}
      className={`flex h-fit w-20 cursor-pointer select-none flex-col items-center fill-blue-500 drop-shadow-md transition-[0.2s] hover:fill-red-500 hover:text-red-500 hover:drop-shadow-mdHover dark:fill-gray-500 dark:drop-shadow-mdDark dark:hover:fill-lime-500 dark:hover:text-lime-500 hover:dark:drop-shadow-mdDarkHover  ${
        bool ? "active" : ""
      } ${altBool ? "pointer-events-none opacity-25" : ""}`}
    >
      {!bool ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="514.322"
          height="539"
          data-name="Layer 1"
          viewBox="0 0 514.322 539"
          className="h-6 w-auto overflow-visible"
        >
          {svgPath}
        </svg>
      ) : (
        <GrClose />
      )}

      <p>{`${!bool ? children : "Close"}`}</p>
    </div>
  );
}
