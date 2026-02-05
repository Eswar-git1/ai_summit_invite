"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        // Target date: 18 February 2026, 9:30 AM IST
        const targetDate = new Date("2026-02-18T09:30:00+05:30").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!isClient) {
        return null; // Prevent hydration mismatch
    }

    return (
        <div className="countdown">
            <div className="countdown__header">
                <span className="countdown__icon">⏱️</span>
                <h3 className="countdown__title">Event Countdown</h3>
            </div>
            <div className="countdown__timer">
                <div className="countdown__unit">
                    <div className="countdown__value">{timeLeft.days}</div>
                    <div className="countdown__label">Days</div>
                </div>
                <div className="countdown__separator">:</div>
                <div className="countdown__unit">
                    <div className="countdown__value">{String(timeLeft.hours).padStart(2, "0")}</div>
                    <div className="countdown__label">Hours</div>
                </div>
                <div className="countdown__separator">:</div>
                <div className="countdown__unit">
                    <div className="countdown__value">{String(timeLeft.minutes).padStart(2, "0")}</div>
                    <div className="countdown__label">Minutes</div>
                </div>
                <div className="countdown__separator">:</div>
                <div className="countdown__unit">
                    <div className="countdown__value">{String(timeLeft.seconds).padStart(2, "0")}</div>
                    <div className="countdown__label">Seconds</div>
                </div>
            </div>
        </div>
    );
}
