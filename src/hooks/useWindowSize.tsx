import { useState, useLayoutEffect, EffectCallback } from "react";

export const useWindowSize = (): { size: Record<string, number> } => {
  const initialWindowWidth =
    typeof window !== "undefined" ? window.innerWidth : 1000;
  const initialWindowHeight =
    typeof window !== "undefined" ? window.innerHeight : 1000;
  const [windowWidth, setWindowWidth] = useState<number>(initialWindowWidth);
  const [windowHeight, setWindowHeight] = useState<number>(initialWindowHeight);
  const handleResize = (): void => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
  };
  useLayoutEffect((): EffectCallback => {
    window.addEventListener("resize", handleResize);
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { size: { windowWidth, windowHeight } };
};
