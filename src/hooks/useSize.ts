/** @format */

import { useEffect, useState } from "react";

/** @format */

export const WindowSize = {
  TABLET: 1518,
  MOBILE: 768,
};

export enum EWindowSize {
  PC = "pc",
  TABLET = "tablet",
  MOBILE = "mobile",
}

const getIsMobile = () => {
  if (window.innerWidth <= WindowSize.MOBILE) return EWindowSize.MOBILE;
  if (window.innerWidth <= WindowSize.TABLET) return EWindowSize.TABLET;
  return EWindowSize.PC;
};

export const useReSize = () => {
  const [mode, setMode] = useState(getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setMode(getIsMobile());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return mode;
};
