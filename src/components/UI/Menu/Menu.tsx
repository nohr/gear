// import { Popup } from "..";
import MenuModal from "./MenuModal";
import MenuToggle from "./MenuToggle";
// import { Feedback } from "../Modals";
import { useCommands } from "common/hooks/useCommands";

export default function Menu() {
  useCommands();
  return (
    <>
      <MenuToggle />
      <MenuModal />
      {/* <Feedback /> */}
      {/* <Popup bool={error}></Popup> */}
    </>
  );
}
