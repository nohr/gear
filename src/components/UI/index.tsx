import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { Gear } from "./Modals";
import Tilt from "react-parallax-tilt";

// Animate the entry and exit of a component.
export const Disk = ({
  children,
  className,
  bool,
}: {
  children: ReactNode;
  className?: string;
  bool: boolean;
}): JSX.Element => {
  return (
    <AnimatePresence>
      {bool ? (
        <motion.div
          initial={{ opacity: 0, rotateZ: 180 }}
          animate={{ opacity: 1, rotateZ: 0 }}
          exit={{ opacity: 0, rotateZ: 180 }}
          transition={{
            duration: 0.9,
            ease: "easeInOut",
          }}
          className={className}
        >
          <Tilt className=" h-full w-full">{children}</Tilt>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export const Popup = ({
  children,
  bool,
}: {
  children: ReactNode;
  bool: boolean | Error | null;
}): JSX.Element => {
  return (
    <AnimatePresence>
      {bool !== null && bool !== false ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`dark:border-lime-500; absolute bottom-2 z-[100] h-[450px] w-[500px] origin-bottom overflow-y-scroll rounded-lg border-[1px] border-red-500 bg-transparent p-8 backdrop-blur-lg dark:border-lime-500`}
        >
          <Tilt className=" h-full w-full">{children}</Tilt>
          <Gear className="pointer-events-none !fixed bottom-[40px] left-1/4 z-10 h-auto scale-150 overflow-hidden fill-blue-500 opacity-10 dark:fill-gray-500" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
export const Fade = ({
  children,
  className,
  bool,
}: {
  children: ReactNode;
  className?: string;
  bool: boolean;
}): JSX.Element => {
  return (
    <AnimatePresence>
      {bool ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={className}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
