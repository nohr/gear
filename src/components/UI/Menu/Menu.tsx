import { useModelStore } from "state/model";
// import { Popup } from "..";
import MenuModal from "./MenuModal";
import MenuToggle from "./MenuToggle";
import { Feedback, ReadMe } from "../Modals";

export default function Menu() {
  const error = useModelStore((state) => state.error);
  console.log(error);

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
