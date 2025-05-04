// components/NavLink.tsx
"use client";

import { useRouteTransition } from "@/hooks/useRouteTransition";
import Spinner from "./loadings/Spinner";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className }: NavLinkProps) {
  const { isNavigating, navigate } = useRouteTransition();
  const path = usePathname()

  return (
    <button
      onClick={() => {path !== href && navigate(href)}}
      className={className}
    >
      {!isNavigating &&children}
      {isNavigating && <Spinner/>}
    </button>
  );
}
