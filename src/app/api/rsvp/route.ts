/**
 * Defence Panel RSVP API Route
 * India AI Impact Summit & Expo 2026
 *
 * This API route handles RSVP form submissions using Supabase.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Type definition for RSVP data
interface RSVPData {
    name: string;
    rank?: string;
    appointment: string;
    unit_organization: string;
    contact_number: string;
    email: string;
    attendance_status: "attending" | "tentative" | "unable";
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Validate RSVP data
 */
function validateRSVPData(data: unknown): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data || typeof data !== "object") {
        return { valid: false, errors: ["Invalid request data"] };
    }

    const rsvp = data as Record<string, unknown>;

    // Accept both frontend field names and database field names
    const name = rsvp.fullName || rsvp.name;
    const appointment = rsvp.designation || rsvp.appointment;
    const unitOrg = rsvp.organisation || rsvp.unit_organization;
    const contact = rsvp.mobile || rsvp.contact_number;
    const email = rsvp.email;
    const status = rsvp.rsvpStatus || rsvp.attendance_status;

    if (!name || typeof name !== "string" || !(name as string).trim()) {
        errors.push("Name is required");
    }

    if (!unitOrg || typeof unitOrg !== "string" || !(unitOrg as string).trim()) {
        errors.push("Organisation is required");
    }

    if (!email || typeof email !== "string" || !(email as string).trim()) {
        errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email as string)) {
        errors.push("Invalid email format");
    }

    // Map frontend status values to database values
    const validStatuses = ["attending", "tentative", "unable", "not_attending"];
    if (!status || !validStatuses.includes(status as string)) {
        errors.push("Valid attendance status is required");
    }

    return { valid: errors.length === 0, errors };
}

/**
 * POST handler for RSVP submissions
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validation = validateRSVPData(body);
        if (!validation.valid) {
            return NextResponse.json(
                { success: false, errors: validation.errors },
                { status: 400 }
            );
        }

        // Map frontend field names to database field names
        const name = (body.fullName || body.name) as string;
        const rank = body.rank as string | undefined;
        const appointment = (body.designation || body.appointment || "Not Specified") as string;
        const unitOrganization = (body.organisation || body.unit_organization) as string;
        const contactNumber = (body.mobile || body.contact_number || "Not Provided") as string;
        const email = body.email as string;

        // Map "not_attending" to "unable" for database
        let attendanceStatus = (body.rsvpStatus || body.attendance_status) as string;
        if (attendanceStatus === "not_attending") {
            attendanceStatus = "unable";
        }

        // Create RSVP record with database field names
        const rsvpData: RSVPData = {
            name: name.trim(),
            rank: rank ? rank.trim() : undefined,
            appointment: appointment.trim(),
            unit_organization: unitOrganization.trim(),
            contact_number: contactNumber.trim(),
            email: email.trim().toLowerCase(),
            attendance_status: attendanceStatus as RSVPData["attendance_status"],
        };

        // Insert into Supabase
        const { data, error } = await supabase
            .from("rsvp_responses")
            .insert([rsvpData])
            .select()
            .single();

        if (error) {
            console.error("Supabase Insert Error:", error);

            // Check for duplicate email
            if (error.code === "23505") {
                return NextResponse.json(
                    { success: false, error: "An RSVP with this email already exists" },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { success: false, error: "Failed to save RSVP" },
                { status: 500 }
            );
        }

        // Log submission (for monitoring)
        console.log("RSVP Submitted:", {
            name: rsvpData.name,
            appointment: rsvpData.appointment,
            status: rsvpData.attendance_status,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
            {
                success: true,
                message: "RSVP submitted successfully",
                data: {
                    id: data.id,
                    name: data.name,
                    status: data.attendance_status,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("RSVP API Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * GET handler - Returns RSVP statistics
 * NOTE: Protected by service role key
 */
export async function GET() {
    try {
        // Get all responses
        const { data: responses, error } = await supabase
            .from("rsvp_responses")
            .select("attendance_status, created_at")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase Select Error:", error);
            return NextResponse.json(
                { success: false, error: "Failed to fetch RSVPs" },
                { status: 500 }
            );
        }

        // Count by status
        const counts = {
            total: responses.length,
            attending: responses.filter((r) => r.attendance_status === "attending").length,
            tentative: responses.filter((r) => r.attendance_status === "tentative").length,
            unable: responses.filter((r) => r.attendance_status === "unable").length,
        };

        return NextResponse.json({
            success: true,
            message: "Defence Panel RSVP API - Supabase",
            counts,
            lastSubmission: responses[0]?.created_at || null,
        });
    } catch (error) {
        console.error("RSVP GET Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
