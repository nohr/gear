import Options from "./Options";
import Status from "./Status";
import { useUIStore } from "state/ui";
import { Disk } from "..";
import { Gear } from "../Modals";
// import ModalButtons from "./ModalButtons";

export default function MenuModal() {
  const menu = useUIStore((state) => state.menu);
  return (
    <Disk
      bool={menu}
      className="absolute -top-[200px] z-40 flex !aspect-square h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-full border-[1px] border-red-500 p-3 backdrop-blur-lg dark:border-lime-500 sm:-top-[300px] md:h-[500px] md:w-[500px]"
    >
      <Gear className=" pointer-events-none left-1/4 z-10 h-auto -scale-100 overflow-hidden fill-blue-500 dark:fill-gray-500" />
      {/* inner group */}
      <div className="flex h-[50%] w-full flex-col items-center justify-end gap-y-4 p-0 pb-10">
        {/* <ModalButtons /> */}
        <Options />
        <Status />
      </div>
    </Disk>
  );
}
