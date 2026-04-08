"use client";

import { LenisScroll } from "@/components/animations/LenisScroll";
import { ReactNode } from "react";

export function ClientVisualsWrapper({ children }: { children: ReactNode }) {
  return (
    <LenisScroll>
      {children}
    </LenisScroll>
  );
}
