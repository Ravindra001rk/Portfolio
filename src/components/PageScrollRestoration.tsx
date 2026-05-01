"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";

/**
 * PageScrollRestoration
 * 
 * This component listens for route changes and ensures that the page
 * scroll position is reset to the top. This is essential when using
 * smooth scrolling libraries like Lenis which may otherwise persist
 * scroll state between page navigations.
 */
export default function PageScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();

  useEffect(() => {
    // Reset scroll to top on every route change
    if (lenis) {
      // Use Lenis scroll if available for a clean reset
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback to native window scroll
      window.scrollTo(0, 0);
    }
  }, [pathname, searchParams, lenis]);

  return null; // This component doesn't render any UI
}
