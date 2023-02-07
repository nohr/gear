import { motion } from "framer-motion";
import { toggleCamera, toggleFullscreen, togglePlay, toggleStart } from "utils";
import { state } from "state";
import { useSnapshot } from "valtio";

export function OptionsButton({ num }: { num: number }): JSX.Element {
  const { selfie, fullscreen, cameraStarted, playing } = useSnapshot(state);
  const optionsArray = [
    {
      label: <>External</>,
      label2: <>Laptop</>,
      func: () => toggleCamera(),
      toggle: selfie,
      key: "L",
    },
    {
      label: <>Fullscreen</>,
      label2: <>Windowed</>,
      func: () => toggleFullscreen(),
      toggle: fullscreen,
      key: "F",
    },
    {
      label: <>Start</>,
      label2: <>Stop</>,
      func: () => toggleStart(),
      toggle: cameraStarted,
      key: "S",
    },
    {
      label: <>Pause</>,
      label2: <>Resume</>,
      func: () => togglePlay(),
      toggle: !playing,
      key: "Space",
    },
  ];

  const { label, label2, func, toggle, key } = optionsArray[num];

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="hover cursor-pointer rounded-lg bg-blue-500 bg-opacity-25 px-2 py-1 font-bold hover:bg-red-500 hover:bg-opacity-25 hover:text-red-500 dark:bg-gray-500 dark:bg-opacity-25 dark:hover:bg-lime-500 dark:hover:bg-opacity-25 hover:dark:text-lime-500"
        onClick={func}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {!toggle ? label : label2}
      </motion.div>
      <p className="text-xs">{`( ${key} )`}</p>
    </div>
  );
}
