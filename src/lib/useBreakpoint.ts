"use client"

import { useLayoutEffect, useState } from "react";

const breakpoints = {
  sm: 376,
  md: 782,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
} as const;

const Breakpoints = {
  SM: 1,
  MD: 2,
  LG: 3,
  XL: 4,
  "2XL": 5,
  "3XL": 6,
} as const;

export type BreakpointsValue = (typeof Breakpoints)[keyof typeof Breakpoints];

export const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointsValue | undefined>();

  const updateBreakpoint = () => {
    const width = window.innerWidth;
    if (width < breakpoints.sm) {
      return Breakpoints.SM;
    }
    if (width < breakpoints.md) {
      return Breakpoints.MD;
    }
    if (width < breakpoints.lg) {
      return Breakpoints.LG;
    }
    if (width < breakpoints.xl) {
      return Breakpoints.XL;
    }
    if (width < breakpoints["2xl"]) {
      return Breakpoints["2XL"];
    }
    return Breakpoints["3XL"];
  };

  useLayoutEffect(() => {
    if (currentBreakpoint === undefined) {
      setCurrentBreakpoint(updateBreakpoint());
    }

    window.addEventListener("resize", updateBreakpoint);
    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  }, [currentBreakpoint, updateBreakpoint]);

  return {
    currentBreakpoint: currentBreakpoint ?? Breakpoints.SM,
    Breakpoints,
    isSM: currentBreakpoint && currentBreakpoint === Breakpoints.SM,
    isMD: currentBreakpoint && currentBreakpoint === Breakpoints.MD,
    isLG: currentBreakpoint && currentBreakpoint === Breakpoints.LG,
    isXL: currentBreakpoint && currentBreakpoint === Breakpoints.XL,
    is2XL: currentBreakpoint && currentBreakpoint === Breakpoints["2XL"],
    is3XL: currentBreakpoint && currentBreakpoint === Breakpoints["3XL"],
    isMobile: currentBreakpoint && currentBreakpoint <= Breakpoints.LG,
    isDesktop: currentBreakpoint && currentBreakpoint > Breakpoints.LG,
  };
};
