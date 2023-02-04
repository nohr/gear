import { MenuProvider } from "context";
import MenuModal from "./MenuModal";
import MenuToggle from "./MenuToggle";
import { Feedback, ReadMe } from "./Modals";

export default function Menu() {
  return (
    <MenuProvider>
      <MenuToggle />
      <MenuModal />
      <ReadMe />
      <Feedback />
    </MenuProvider>
  );
}
