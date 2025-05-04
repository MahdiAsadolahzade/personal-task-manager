// hooks/useRouteTransition.ts
"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

export function useRouteTransition() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = (href: string) => {
    setIsNavigating(true);
    startTransition(() => {
      router.push(href);
      setTimeout(() => {
        setIsNavigating(false);
      }, 1000); // Fallback timeout in case transition never ends
    });
  };

  return { isNavigating: isPending || isNavigating, navigate };
}
