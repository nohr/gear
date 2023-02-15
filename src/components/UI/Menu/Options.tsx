import { useGameStore } from "state/game";
import { useModelStore } from "state/model";
import { useInfoStore, useUIStore } from "state/ui";

import { motion } from "framer-motion";

function OptionsButton({
  label,
  label2,
  func,
  toggle,
  command,
}: {
  label: JSX.Element;
  label2: JSX.Element;
  func: () => void;
  toggle: boolean;
  command: string;
}): JSX.Element {
  return (
    <div className="flex !select-none flex-col items-center">
      <motion.div
        className="hover cursor-pointer rounded-lg bg-blue-500 bg-opacity-25 px-2 py-1 font-bold hover:bg-red-500 hover:bg-opacity-25 hover:text-red-500 dark:bg-gray-500 dark:bg-opacity-25 dark:hover:bg-lime-500 dark:hover:bg-opacity-25 hover:dark:text-lime-500"
        onClick={func}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {toggle ? label2 : label}
      </motion.div>
      <p className="text-xs">{`( ${command} )`}</p>
    </div>
  );
}
export default function Options() {
  const setSelfie = useModelStore((state) => state.setSelfie);
  const selfie = useModelStore((state) => state.selfie);
  const fullscreen = useInfoStore((state) => state.fullscreen);
  const setFullscreen = useInfoStore((state) => state.setFullscreen);
  const kill_holistic = useModelStore((state) => state.kill_holistic);
  const stop_input = useModelStore((state) => state.stop_input);
  // const camera = useModelStore((state) => state.camera);
  const playing = useGameStore((state) => state.playing);
  const started = useGameStore((state) => state.started);
  const start = useGameStore((state) => state.start);
  const stop = useGameStore((state) => state.stop);
  const setPlay = useGameStore((state) => state.setPlay);
  const setStatus = useUIStore((state) => state.setStatus);

  const optionsArray = [
    {
      label: <>Laptop</>,
      label2: <>External</>,
      func: () => {
        if (started) stop();
        stop_input();
        kill_holistic();
        setSelfie();
        setStatus(
          <span>
            using <b>{selfie ? "Laptop" : "External"}</b> camera
          </span>
        );
      },
      toggle: selfie,
      command: "L",
    },
    {
      label: <>Fullscreen</>,
      label2: <>Windowed</>,
      func: () => {
        !fullscreen
          ? setStatus("entering fullscreen")
          : setStatus("exiting fullscreen");
        setFullscreen();
      },
      toggle: fullscreen,
      command: "F",
    },
    {
      label: <>Start</>,
      label2: <>Stop</>,
      func: () => {
        started
          ? setStatus("stopping holistic")
          : setStatus("starting holistic");
        started ? stop() : start();
      },
      toggle: started,
      command: "S",
    },
    {
      label: <>Resume</>,
      label2: <>Pause</>,
      func: () => setPlay(),
      toggle: playing,
      command: "Space",
    },
  ];

  return (
    <div className="flex select-none flex-row gap-x-4">
      <OptionsButton {...optionsArray[0]} />
      <OptionsButton {...optionsArray[1]} />
      <OptionsButton {...optionsArray[2]} />
      {started ? <OptionsButton {...optionsArray[3]} /> : null}
    </div>
  );
}
