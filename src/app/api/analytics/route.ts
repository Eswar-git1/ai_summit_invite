/**
 * Analytics API Route
 * Tracks page visits
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { page_path, visitor_id } = body;

        // Get user agent and referrer from headers
        const userAgent = request.headers.get("user-agent") || "Unknown";
        const referrer = request.headers.get("referer") || "Direct";

        // Insert analytics record
        const { error } = await supabase
            .from("page_analytics")
            .insert([
                {
                    page_path,
                    visitor_id,
                    user_agent: userAgent,
                    referrer,
                },
            ]);

        if (error) {
            console.error("Analytics Error:", error);
            return NextResponse.json(
                { success: false },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics API Error:", error);
        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}
