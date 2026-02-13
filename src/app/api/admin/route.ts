/**
 * Admin Dashboard API Route
 * Fetches analytics and RSVP data from Supabase
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with service role
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * GET handler - Returns dashboard analytics
 */
export async function GET(request: NextRequest) {
    try {
        // Simple authentication check - verify admin key in header
        const authHeader = request.headers.get("x-admin-key");
        const adminKey = process.env.ADMIN_SECRET_KEY || "eswar-admin-2026";

        if (authHeader !== adminKey) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Fetch all RSVP responses
        const { data: responses, error } = await supabase
            .from("rsvp_responses")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase Error:", error);
            return NextResponse.json(
                { success: false, error: "Failed to fetch data" },
                { status: 500 }
            );
        }

        // Calculate statistics
        const total = responses.length;
        const attending = responses.filter((r) => r.attendance_status === "attending").length;
        const tentative = responses.filter((r) => r.attendance_status === "tentative").length;
        const unable = responses.filter((r) => r.attendance_status === "unable").length;

        // Group by date
        const responsesByDate: Record<string, number> = {};
        responses.forEach((r) => {
            const date = new Date(r.created_at).toLocaleDateString("en-IN");
            responsesByDate[date] = (responsesByDate[date] || 0) + 1;
        });

        // All responses
        const recentResponses = responses.map((r) => ({
            id: r.id,
            name: r.name,
            appointment: r.appointment,
            unit_organization: r.unit_organization,
            status: r.attendance_status,
            created_at: r.created_at,
        }));

        // Fetch page analytics
        const { data: analytics, error: analyticsError } = await supabase
            .from("page_analytics")
            .select("*")
            .range(0, 99999);

        let pageVisits = {
            totalVisits: 0,
            uniqueVisitors: 0,
            pageViews: {} as Record<string, number>,
        };

        if (!analyticsError && analytics) {
            pageVisits.totalVisits = analytics.length;

            // Count unique visitors
            const uniqueVisitorIds = new Set(analytics.map((a) => a.visitor_id));
            pageVisits.uniqueVisitors = uniqueVisitorIds.size;

            // Count visits by page
            analytics.forEach((a) => {
                const page = a.page_path || "/";
                pageVisits.pageViews[page] = (pageVisits.pageViews[page] || 0) + 1;
            });
        }

        return NextResponse.json({
            success: true,
            data: {
                summary: {
                    total,
                    attending,
                    tentative,
                    unable,
                },
                pageVisits,
                responsesByDate,
                recentResponses,
                lastUpdated: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error("Admin API Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
