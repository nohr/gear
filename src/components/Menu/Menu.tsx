import MenuProvider from "context";
import MenuModal from "./MenuModal";
import { MenuToggle } from "./MenuToggle";

export default function Menu() {
  return (
    <MenuProvider>
      <MenuToggle />
      <MenuModal />
    </MenuProvider>
  );
}
