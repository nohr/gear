// import { Popup } from "..";
import MenuModal from "./MenuModal";
import MenuToggle from "./MenuToggle";
import { Feedback, ReadMe } from "../Modals";
import { useCommands } from "common/hooks/useCommands";

export default function Menu() {
  useCommands();
  return (
    <>
      <MenuToggle />
      <MenuModal />
      <ReadMe />
      <Feedback />
      {/* <Popup bool={error}></Popup> */}
    </>
  );
}
