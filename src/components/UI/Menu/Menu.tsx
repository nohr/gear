// import { useModelStore } from "state/model";
// import { Popup } from "..";
import MenuModal from "./MenuModal";
import MenuToggle from "./MenuToggle";
import { Feedback, ReadMe } from "../Modals";
import { useCallback, useEffect } from "react";

export default function Menu() {
  // TODO: handle key commands
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    console.log(`Key pressed: ${event.key}`);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
