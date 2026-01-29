/**
 * Defence Panel RSVP - Root Layout
 * India AI Impact Summit & Expo 2026
 * 
 * SEO optimized layout with proper meta tags for official government event
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Defence Panel RSVP | India AI Impact Summit & Expo 2026",
  description:
    "RSVP for the Defence Perspective in AI panel discussion curated by the Indian Army at India AI Impact Summit & Expo 2026. 18 February 2026, Nalanda Auditorium, Dr Ambedkar International Centre.",
  keywords: [
    "India AI Summit",
    "Defence Panel",
    "Indian Army",
    "AI Impact Summit 2026",
    "Defence AI",
    "RSVP",
  ],
  authors: [{ name: "Indian Army" }],
  robots: "noindex, nofollow", // Private RSVP page - should not be indexed
  openGraph: {
    title: "Defence Panel RSVP | India AI Impact Summit & Expo 2026",
    description:
      "RSVP for the Defence Perspective in AI panel discussion curated by the Indian Army",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a237e" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
