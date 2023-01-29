import React, { createContext, ReactNode, useRef, useState } from "react";

export const MenuContext = createContext<MenuProps>({
  menu: false,
  setMenu: () => {},
  menuRef: null,
  readme: false,
  setReadMe: () => {},
  feedback: false,
  setFeedback: () => {},
});

function MenuProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<boolean>(true);
  const [readme, setReadMe] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <MenuContext.Provider
      value={{
        menu,
        setMenu,
        menuRef,
        readme,
        setReadMe,
        feedback,
        setFeedback,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export default MenuProvider;
