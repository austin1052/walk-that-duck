import { useState, useEffect, createContext } from "react";

export const MobileContext = createContext(null);

export function MobileContextProvider({ children }) {
  const [isMobile, setIsMobile] = useState(true);
  const [width, setWidth] = useState(undefined);


  useEffect(() => {
    setWidth(window.innerWidth)
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    width > 768 ? setIsMobile(false) : setIsMobile(true);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <MobileContext.Provider value={isMobile} >
      {children}
    </MobileContext.Provider >
  )
}

