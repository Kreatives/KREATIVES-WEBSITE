"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackStarterStep } from "@/lib/starter-funnel";

/**
 * Drop-in voor next/link voor de "Bekijk pakketten"-knoppen (naar #pakketten).
 * Meet StarterPackagesClicked — met toestemming en hooguit één keer per sessie.
 */
export default function StarterLink({
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackStarterStep("StarterPackagesClicked", {
          onceKey: "packages-clicked",
        });
        onClick?.(e);
      }}
    />
  );
}
