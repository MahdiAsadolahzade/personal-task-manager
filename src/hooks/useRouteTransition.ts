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
      }, 0); 
    });
  };

  return { isNavigating: isPending || isNavigating, navigate };
}
