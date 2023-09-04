import { useState, createContext } from "react";
import { getSession } from "@/supabase/utils";

export interface NavContext {
  menuVisible: boolean | null;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean | null>>;
  showNavMenu: boolean;
  setShowNavMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavContext = createContext<NavContext>({
  menuVisible: null,
  setMenuVisible: () => {},
  showNavMenu: false,
  setShowNavMenu: () => {},
});

export function NavContextProvider({ children }: any) {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [menuVisible, setMenuVisible] = useState<boolean | null>(null);

  return (
    <NavContext.Provider
      value={{ menuVisible, setMenuVisible, showNavMenu, setShowNavMenu }}
    >
      {children}
    </NavContext.Provider>
  );
}
