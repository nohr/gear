import { motion } from "framer-motion";
import { toggleCamera, toggleFullscreen, toggleStart } from "../common/utils";
import { state } from "../common/state";
import { useSnapshot } from "valtio";

export default function Options() {
  return (
    <div className="flex select-none flex-row gap-x-4">
      <OptionsButton num={0} />
      <OptionsButton num={1} />
      <OptionsButton num={2} />
    </div>
  );
}

function OptionsButton({ num }: { num: number }) {
  const { selfie, fullscreen, cameraStarted } = useSnapshot(state);
  const optionsArray = [
    {
      label: <>External</>,
      label2: <>Laptop</>,
      func: () => toggleCamera(),
      toggle: selfie,
      caption: "L",
    },
    {
      label: <>Fullscreen</>,
      label2: <>Windowed</>,
      func: () => toggleFullscreen(),
      toggle: fullscreen,
      caption: "F",
    },
    {
      label: <>Start</>,
      label2: <>Stop</>,
      func: () => toggleStart(),
      toggle: cameraStarted,
      caption: "Space",
    },
  ];

  const { label, label2, func, toggle, caption } = optionsArray[num];

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="optionsButton"
        onClick={() => func()}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {!toggle ? label : label2}
      </motion.div>
      <p className="text-xs">{caption}</p>
    </div>
  );
}
