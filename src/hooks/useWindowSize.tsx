import { useState, useEffect, EffectCallback } from "react";
import debounce from "lodash/debounce";

export const useWindowSize = (): { size: Record<string, number> } => {
  const initialWindowWidth =
    typeof window !== "undefined" ? window.innerWidth : 1000;
  const initialWindowHeight =
    typeof window !== "undefined" ? window.innerHeight : 1000;
  const [windowWidth, setWindowWidth] = useState<number>(initialWindowWidth);
  const [windowHeight, setWindowHeight] = useState<number>(initialWindowHeight);
  const handleResize = debounce((): void => {
    console.log("Resize");
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
  }, 250);
  useEffect((): EffectCallback => {
    window.addEventListener("resize", handleResize);
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { size: { windowWidth, windowHeight } };
};
