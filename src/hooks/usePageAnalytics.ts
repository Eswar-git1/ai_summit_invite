/**
 * Analytics Hook
 * Tracks page visits automatically
 */

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function usePageAnalytics() {
    const pathname = usePathname();

    useEffect(() => {
        // Get or create visitor ID
        let visitorId = localStorage.getItem("visitor_id");
        if (!visitorId) {
            visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem("visitor_id", visitorId);
        }

        // Track page visit
        const trackVisit = async () => {
            try {
                await fetch("/api/analytics", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        page_path: pathname,
                        visitor_id: visitorId,
                    }),
                });
            } catch (error) {
                // Silently fail - don't disrupt user experience
                console.debug("Analytics tracking failed:", error);
            }
        };

        trackVisit();
    }, [pathname]);
}
