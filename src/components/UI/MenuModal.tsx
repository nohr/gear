import { useContext } from "react";
import { MenuContext } from "context";
import ModalButtons from "./ModalButtons";
import Options from "./Options";
import Status from "./Status";
import Description from "./Description";
import { AnimatePresence, motion } from "framer-motion";

export default function MenuModal() {
  const { menu, menuRef } = useContext(MenuContext);
  return (
    <AnimatePresence>
      {menu ? (
        //  outer group
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={menuRef}
          className=" absolute -top-[130px] z-40 flex aspect-square h-auto w-full flex-col items-center justify-end rounded-full border-[1px] border-red-500 p-3 backdrop-blur-lg dark:border-lime-500 md:-top-[250px] md:w-[600px]"
        >
          {/* inner group */}
          <div className="flex h-[50%] w-full flex-col items-center gap-y-3 p-0">
            <Description />
            <ModalButtons />
            <Options />
            <Status />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
