import { ReadMePath } from "./ModalButtonPaths";
import { useUIStore } from "state/ui";
import { GrClose } from "react-icons/gr";
import type { ReactNode } from "react";
import { useGameStore } from "state/game";

export default function ModalButtons() {
  const [readme, setReadme] = useUIStore((state) => [
    state.readme,
    state.setReadme,
  ]);
  return (
    // <div className="flex w-48 flex-row justify-between gap-x-8">
    <IconButton bool={readme} setBool={setReadme} svgPath={ReadMePath}>
      README
    </IconButton>
    // </div>
  );
}
function IconButton({
  bool,
  setBool,
  svgPath,
  children,
}: {
  bool: boolean;
  setBool: (bool?: boolean) => void;
  svgPath: JSX.Element;
  children: ReactNode;
}) {
  const playing = useGameStore((state) => state.playing);

  return (
    <div
      onClick={() => setBool()}
      className={`flex h-fit w-20 cursor-pointer select-none flex-col items-center fill-blue-500 drop-shadow-md transition-[0.2s] hover:fill-red-500 hover:text-red-500 hover:drop-shadow-mdHover dark:fill-gray-500 dark:drop-shadow-mdDark dark:hover:fill-lime-500 dark:hover:text-lime-500 hover:dark:drop-shadow-mdDarkHover  ${
        bool ? "active" : ""
      } ${playing ? "pointer-events-none opacity-25" : ""}`}
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
