"use client";

import Button from "@/components/Button";

type Variant = "primary" | "dark" | "white" | "ghost";

export function openRedesign() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-redesign"));
  }
}

export default function RedesignTrigger({
  children,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Button variant={variant} className={className} onClick={openRedesign}>
      {children}
    </Button>
  );
}
