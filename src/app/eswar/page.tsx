/**
 * Admin Dashboard - RSVP Analytics
 * Protected route at /eswar
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NeuralBackground from "@/components/NeuralBackground";

interface DashboardData {
    summary: {
        total: number;
        attending: number;
        tentative: number;
        unable: number;
    };
    pageVisits: {
        totalVisits: number;
        uniqueVisitors: number;
        pageViews: Record<string, number>;
    };
    responsesByDate: Record<string, number>;
    recentResponses: Array<{
        id: string;
        name: string;
        appointment: string;
        unit_organization: string;
        status: string;
        created_at: string;
    }>;
    lastUpdated: string;
}

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple client-side password check
        if (password === "eswar2026") {
            setIsAuthenticated(true);
            setError("");
            fetchDashboardData();
        } else {
            setError("Invalid password");
        }
    };

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/admin", {
                headers: {
                    "x-admin-key": "eswar-admin-2026",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const result = await response.json();
            if (result.success) {
                setData(result.data);
            }
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setError("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30s
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="page-wrapper">
                <NeuralBackground
                    nodeCount={30}
                    connectionDistance={150}
                    nodeColor="74, 111, 54"
                    lineColor="74, 111, 54"
                />

                <div className="admin-login">
                    <div className="admin-login__card">
                        <div className="admin-login__header">
                            <Image
                                src="/images/DGIS logo.png"
                                alt="DGIS"
                                width={80}
                                height={80}
                                className="admin-login__logo"
                            />
                            <h1 className="admin-login__title">Admin Dashboard</h1>
                            <p className="admin-login__subtitle">Defence Panel RSVP Analytics</p>
                        </div>

                        <form onSubmit={handleLogin} className="admin-login__form">
                            <div className="form__group">
                                <label htmlFor="password" className="form__label">
                                    Access Code
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form__input"
                                    placeholder="Enter access code"
                                    autoFocus
                                />
                                {error && <span className="form__error">⚠ {error}</span>}
                            </div>

                            <button type="submit" className="btn btn--primary btn--full">
                                Access Dashboard
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    if (loading && !data) {
        return (
            <div className="page-wrapper">
                <NeuralBackground
                    nodeCount={30}
                    connectionDistance={150}
                    nodeColor="74, 111, 54"
                    lineColor="74, 111, 54"
                />
                <div className="admin-loading">
                    <div className="spinner"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const attendanceRate = data.summary.total > 0
        ? ((data.summary.attending / data.summary.total) * 100).toFixed(1)
        : "0";

    return (
        <div className="page-wrapper">
            <NeuralBackground
                nodeCount={30}
                connectionDistance={150}
                nodeColor="74, 111, 54"
                lineColor="255, 153, 51"
            />

            {/* Header */}
            <header className="hero hero--compact">
                <div className="hero__content">
                    <div className="hero__logos">
                        <Image
                            src="/images/DGIS logo.png"
                            alt="DGIS"
                            width={60}
                            height={60}
                            className="hero__logo hero__logo--dgis"
                        />
                        <Image
                            src="/images/AI Summit logo.png"
                            alt="AI Summit"
                            width={60}
                            height={60}
                            className="hero__logo hero__logo--summit"
                        />
                    </div>
                    <h1 className="admin-title">RSVP Analytics Dashboard</h1>
                    <p className="admin-subtitle">Defence Panel Discussion • Real-time Insights</p>
                </div>
            </header>

            {/* Main Dashboard */}
            <main className="container container--wide">
                {/* Summary Cards */}
                <section className="section">
                    <h2 className="section__title">RSVP Summary</h2>
                    <div className="stats-grid">
                        <div className="stat-card stat-card--primary">
                            <div className="stat-card__icon">📊</div>
                            <div className="stat-card__content">
                                <div className="stat-card__value">{data.summary.total}</div>
                                <div className="stat-card__label">Total Responses</div>
                            </div>
                        </div>

                        <div className="stat-card stat-card--success">
                            <div className="stat-card__icon">✅</div>
                            <div className="stat-card__content">
                                <div className="stat-card__value">{data.summary.attending}</div>
                                <div className="stat-card__label">Attending</div>
                            </div>
                        </div>

                        <div className="stat-card stat-card--warning">
                            <div className="stat-card__icon">❓</div>
                            <div className="stat-card__content">
                                <div className="stat-card__value">{data.summary.tentative}</div>
                                <div className="stat-card__label">Tentative</div>
                            </div>
                        </div>

                        <div className="stat-card stat-card--danger">
                            <div className="stat-card__icon">❌</div>
                            <div className="stat-card__content">
                                <div className="stat-card__value">{data.summary.unable}</div>
                                <div className="stat-card__label">Unable to Attend</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Page Visit Analytics */}
                <section className="section">
                    <h2 className="section__title">Website Analytics</h2>
                    <div className="stats-grid stats-grid--2col">
                        <div className="stat-card stat-card--info">
                            <div className="stat-card__icon">👁️</div>
                            <div className="stat-card__content">
                                <div className="stat-card__value">{data.pageVisits.totalVisits}</div>
                                <div className="stat-card__label">Total Page Visits</div>
                            </div>
                        </div>

                        <div className="stat-card stat-card--info">
                            <div className="stat-card__icon">👥</div>
                            <div className="stat-card__content">
                                <div className="stat-card__value">{data.pageVisits.uniqueVisitors}</div>
                                <div className="stat-card__label">Unique Visitors</div>
                            </div>
                        </div>
                    </div>

                    {/* Page Views Breakdown */}
                    {Object.keys(data.pageVisits.pageViews).length > 0 && (
                        <div className="card" style={{ marginTop: "var(--space-lg)" }}>
                            <div className="card__header">
                                <h3 className="card__title">Page Views Breakdown</h3>
                            </div>
                            <div className="card__body">
                                <div className="page-views-list">
                                    {Object.entries(data.pageVisits.pageViews)
                                        .sort(([, a], [, b]) => b - a)
                                        .map(([page, count]) => (
                                            <div key={page} className="page-view-item">
                                                <span className="page-view-item__path">{page}</span>
                                                <span className="page-view-item__count">{count} visits</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Attendance Rate */}
                <section className="section">
                    <div className="card">
                        <div className="card__header">
                            <h2 className="card__title">Attendance Rate</h2>
                        </div>
                        <div className="card__body">
                            <div className="progress-circle">
                                <svg viewBox="0 0 200 200" className="progress-circle__svg">
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="none"
                                        stroke="rgba(74, 111, 54, 0.2)"
                                        strokeWidth="20"
                                    />
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="none"
                                        stroke="var(--color-army)"
                                        strokeWidth="20"
                                        strokeDasharray={`${(parseFloat(attendanceRate) / 100) * 502} 502`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 100 100)"
                                    />
                                </svg>
                                <div className="progress-circle__text">
                                    <div className="progress-circle__value">{attendanceRate}%</div>
                                    <div className="progress-circle__label">Confirmed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Responses */}
                <section className="section">
                    <div className="card">
                        <div className="card__header">
                            <h2 className="card__title">All RSVP Responses</h2>
                            <button onClick={fetchDashboardData} className="btn btn--sm">
                                🔄 Refresh
                            </button>
                        </div>
                        <div className="card__body">
                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Appointment</th>
                                            <th>Unit/Organization</th>
                                            <th>Status</th>
                                            <th>Submitted</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.recentResponses.map((response) => (
                                            <tr key={response.id}>
                                                <td className="admin-table__name">{response.name}</td>
                                                <td>{response.appointment}</td>
                                                <td>{response.unit_organization}</td>
                                                <td>
                                                    <span className={`status-badge status-badge--${response.status}`}>
                                                        {response.status}
                                                    </span>
                                                </td>
                                                <td className="admin-table__date">
                                                    {new Date(response.created_at).toLocaleString("en-IN", {
                                                        dateStyle: "short",
                                                        timeStyle: "short",
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Back to Home */}
                <section className="section text-center">
                    <Link href="/" className="btn btn--primary">
                        ← Back to RSVP Page
                    </Link>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer__content">
                    <p className="footer__copyright">
                        Last updated: {new Date(data.lastUpdated).toLocaleString("en-IN")}
                    </p>
                </div>
            </footer>
        </div>
    );
}
