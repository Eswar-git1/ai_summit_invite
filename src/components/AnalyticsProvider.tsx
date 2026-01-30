/**
 * Analytics Provider Component
 * Wraps children and tracks page visits
 */

"use client";

import { usePageAnalytics } from "@/hooks/usePageAnalytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    usePageAnalytics();
    return <>{children}</>;
}
