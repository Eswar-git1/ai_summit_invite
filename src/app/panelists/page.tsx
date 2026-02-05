/**
 * Defence Panel - Panelists Page
 * India AI Impact Summit & Expo 2026
 * 
 * Structure:
 * - 1 Keynote Speaker: Lt Gen Vipul Shinghal (DCOAS)
 * - 4 Panel Members: Lt Gen Harsh Chhibber, Maj Gen Pawan Anand, Dr Vikram Jayaram, Prof. Ganesh Ramakrishnan
 * - 1 Moderator: Mr Subimal Bhattacharjee
 * 
 * Information sourced from official deck (EXACT)
 */

import Image from "next/image";
import Link from "next/link";
import NeuralBackground from "@/components/NeuralBackground";

// Keynote Speaker - DCOAS (IS&T)
const keynote = {
    name: "Lt Gen Vipul Shinghal, AVSM, SM",
    designation: "DCOAS (IS&T)",
    organization: "Indian Army",
    image: "/images/DCOAS pic.png",
    topic: "AI Disruption in Warfare and Transformation of the Indian Army",
    speakingOn: [
        "AI as a force multiplier in future military operations and decision-making",
        "Transformation of information systems, networks and data-driven warfare",
        "Indian Army's vision for AI-enabled capability development and integration",
    ],
    about: [
        "Deputy Chief of Army Staff (Information Systems & Technology), responsible for digital and technology transformation of the Indian Army",
        "Armoured Corps officer with extensive command and operational experience across strike formations and corps level",
        "Awarded AVSM and Sena Medal for distinguished service; alumnus of NDA, DSSC and National Defence College",
    ],
};

// 4 Panel Members (ordered by theme sequence)
const panelMembers = [
    // 1. Lt Gen Harsh Chhibber (DGIS) - AI Disruption in Military Operations
    {
        name: "Lt Gen Harsh Chhibber, AVSM, VSM, PhD",
        designation: "DGIS",
        organization: "Indian Army",
        image: "/images/DGIS PIc.png",
        topic: "AI Disruption in Military Operations: Strategic Perspective",
        speakingOn: [
            "AI-enabled ISR, cyber and information operations across domains",
            "Decision-support systems enhancing operational tempo and accuracy",
            "Strategic implications for the evolving character of warfare",
        ],
        about: [
            "Director General of Information Systems, Indian Army, leading digital and AI transformation",
            "PhD in Public Policy with extensive experience in military information systems and operational logistics",
            "Awarded AVSM and VSM for distinguished service and technology-driven capability development",
        ],
    },
    // 2. Prof. Ganesh Ramakrishnan - Global Landscape and Trends
    {
        name: "Prof. Ganesh Ramakrishnan",
        designation: "Academic Expert",
        organization: "",
        image: "/images/ProF Ganesh Ramakrishnan Pic.png",
        topic: "Global Landscape and Trends in AI Integration in Defence",
        speakingOn: [
            "Global advances in AI-enabled command and control systems",
            "Operational lessons from AI in unmanned systems, logistics and predictive maintenance",
            "Implications for future military capability development",
        ],
        about: [
            "Founding Board member BharatGen",
            "Institute Chair Professor, Dept of Computer Science and Engineering, IIT Bombay",
            "National leader in sovereign, multilingual AI systems",
        ],
    },
    // 3. Maj Gen Pawan Anand - Governance, Regulation and Responsible AI
    {
        name: "Maj Gen Pawan Anand, AVSM, PhD (Retd)",
        designation: "Strategic & Policy Expert",
        organization: "",
        image: "/images/Maj Gen Pawan Anand Pic.png",
        topic: "Governance, Regulation and Responsible AI in Defence",
        speakingOn: [
            "Ethical, legal and strategic considerations in military AI deployment",
            "Policy frameworks for accountability, transparency and human oversight",
            "Balancing operational advantage with responsible and lawful AI use",
        ],
        about: [
            "Professor and Mentor at the National Defence College; Director, Centre for Emerging Technologies for Atma Nirbhar Bharat (USI-CETANB)",
            "Former Chief Engineer, South Western Command; extensive experience in defence procurement",
            "Doctorate in General Management with focus on indigenisation and defence self-reliance",
        ],
    },
    // 4. Dr Vikram Jayaram - Indian Industry Perspective
    {
        name: "Dr Vikram Jayaram",
        designation: "Founder & CEO, Neuralix",
        organization: "",
        image: "/images/Dr Vikram Jayaram pic.png",
        topic: "Indian Industry Perspective on AI",
        speakingOn: [
            "Readiness of Indian industry to deliver AI-enabled defence solutions",
            "Indigenous capability development and Atmanirbhar Bharat initiatives",
            "Collaborative models between Armed Forces, R&D and industry",
        ],
        about: [
            "Industry leader with over two decades of experience in AI and machine learning systems",
            "Former Head of R&D and Data Science at Pioneer Natural Resources (ExxonMobil group)",
            "Expert in deploying AI at scale for mission-critical, high-reliability environments",
        ],
    },
];

// Moderator
const moderator = {
    name: "Mr Subimal Bhattacharjee",
    designation: "Independent Consultant and Commentator on Tech issues",
    organization: "",
    image: "/images/Mr Subimal Bhattacharjee pic moderator.png",
    about: [
        "Policy adviser on artificial intelligence, cyber security and defence technologies",
        "Former India Head, General Dynamics; editorial board member, Cyber Journal (Chatham House)",
        "Senior commentator and columnist on strategic technology and national security",
    ],
};

export default function PanelistsPage() {
    return (
        <div className="page-wrapper">
            {/* Neural Network Background - Olive Green */}
            <NeuralBackground
                nodeCount={35}
                connectionDistance={150}
                nodeColor="74, 111, 54"
                lineColor="255, 153, 51"
            />

            {/* Hero Header */}
            <header className="hero">
                <div className="hero__content">
                    <div className="hero__logos">
                        <Image
                            src="/images/indian-army-logo-transparent.png"
                            alt="Indian Army"
                            width={120}
                            height={120}
                            className="hero__logo hero__logo--army"
                            priority
                        />
                        <Image
                            src="/images/DGIS logo.png"
                            alt="DGIS Logo"
                            width={120}
                            height={120}
                            className="hero__logo hero__logo--dgis"
                            priority
                        />
                        <Image
                            src="/images/AI Summit logo.png"
                            alt="India AI Impact Summit Logo"
                            width={120}
                            height={120}
                            className="hero__logo hero__logo--summit"
                            priority
                        />
                    </div>

                    <div className="panelists-hero">
                        <h1 className="panelists-hero__title">
                            Distinguished Panelists
                        </h1>
                        <p className="panelists-hero__subtitle">
                            Defence Panel Discussion • Defence Perspective in AI
                        </p>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="nav" role="navigation" aria-label="Main navigation">
                <Link href="/" className="nav__link">
                    RSVP
                </Link>
                <Link href="/panelists" className="nav__link nav__link--active">
                    Panelists
                </Link>
            </nav>

            {/* Main Content */}
            <main className="container container--wide">

                {/* 1. KEYNOTE SPEAKER (1) */}
                <section className="section" aria-labelledby="keynote-title">
                    <h2 id="keynote-title" className="section__title">
                        <span className="section__title-icon">⭐</span>
                        Keynote Speaker
                        <span className="section__title-line" />
                    </h2>

                    <article className="panelist-card panelist-card--keynote panelist-card--featured">
                        <span className="panelist-card__badge">Keynote</span>
                        <div className="panelist-card__image-container">
                            <Image
                                src={keynote.image}
                                alt={keynote.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 280px"
                                className="panelist-card__image"
                                priority
                            />
                            <div className="panelist-card__overlay" />
                        </div>
                        <div className="panelist-card__content">
                            <h3 className="panelist-card__name">{keynote.name}</h3>
                            <p className="panelist-card__designation">{keynote.designation}</p>
                            <p className="panelist-card__organization">{keynote.organization}</p>

                            <div className="panelist-card__topic-badge">{keynote.topic}</div>

                            {/* Speaking On - Topic Points */}
                            <div className="panelist-card__section">
                                <h4 className="panelist-card__section-title">
                                    <span className="panelist-card__section-icon">🎯</span>
                                    Speaking On
                                </h4>
                                <ul className="panelist-card__list panelist-card__list--topics">
                                    {keynote.speakingOn.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* About - Bio */}
                            <div className="panelist-card__section">
                                <h4 className="panelist-card__section-title">
                                    <span className="panelist-card__section-icon">👤</span>
                                    About
                                </h4>
                                <ul className="panelist-card__list panelist-card__list--about">
                                    {keynote.about.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>
                </section>

                {/* 2. PANEL MEMBERS (4) */}
                <section className="section" aria-labelledby="panelists-title">
                    <h2 id="panelists-title" className="section__title">
                        <span className="section__title-icon">👥</span>
                        Panel Members
                        <span className="section__title-line" />
                    </h2>

                    {/* First two panel members - featured layout */}
                    <div className="panelists-featured-grid">
                        {panelMembers.slice(0, 2).map((panelist, index) => (
                            <article key={index} className="panelist-card panelist-card--featured-half">
                                <div className="panelist-card__image-container">
                                    <Image
                                        src={panelist.image}
                                        alt={panelist.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 280px"
                                        className="panelist-card__image"
                                    />
                                    <div className="panelist-card__overlay" />
                                </div>
                                <div className="panelist-card__content">
                                    <h3 className="panelist-card__name">{panelist.name}</h3>
                                    <p className="panelist-card__designation">{panelist.designation}</p>
                                    {panelist.organization && (
                                        <p className="panelist-card__organization">{panelist.organization}</p>
                                    )}

                                    <div className="panelist-card__topic-badge">{panelist.topic}</div>

                                    {/* Speaking On */}
                                    <div className="panelist-card__section">
                                        <h4 className="panelist-card__section-title">
                                            <span className="panelist-card__section-icon">🎯</span>
                                            Speaking On
                                        </h4>
                                        <ul className="panelist-card__list panelist-card__list--topics">
                                            {panelist.speakingOn.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* About */}
                                    <div className="panelist-card__section">
                                        <h4 className="panelist-card__section-title">
                                            <span className="panelist-card__section-icon">👤</span>
                                            About
                                        </h4>
                                        <ul className="panelist-card__list panelist-card__list--about">
                                            {panelist.about.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Remaining two panel members */}
                    <div className="panelists-featured-grid mt-lg">
                        {panelMembers.slice(2, 4).map((panelist, index) => (
                            <article key={index} className="panelist-card panelist-card--featured-half">
                                <div className="panelist-card__image-container">
                                    <Image
                                        src={panelist.image}
                                        alt={panelist.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 280px"
                                        className="panelist-card__image"
                                    />
                                    <div className="panelist-card__overlay" />
                                </div>
                                <div className="panelist-card__content">
                                    <h3 className="panelist-card__name">{panelist.name}</h3>
                                    <p className="panelist-card__designation">{panelist.designation}</p>
                                    {panelist.organization && (
                                        <p className="panelist-card__organization">{panelist.organization}</p>
                                    )}

                                    <div className="panelist-card__topic-badge">{panelist.topic}</div>

                                    {/* Speaking On */}
                                    <div className="panelist-card__section">
                                        <h4 className="panelist-card__section-title">
                                            <span className="panelist-card__section-icon">🎯</span>
                                            Speaking On
                                        </h4>
                                        <ul className="panelist-card__list panelist-card__list--topics">
                                            {panelist.speakingOn.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* About */}
                                    <div className="panelist-card__section">
                                        <h4 className="panelist-card__section-title">
                                            <span className="panelist-card__section-icon">👤</span>
                                            About
                                        </h4>
                                        <ul className="panelist-card__list panelist-card__list--about">
                                            {panelist.about.map((point, i) => (
                                                <li key={i}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 3. MODERATOR (1) */}
                <section className="section" aria-labelledby="moderator-title">
                    <h2 id="moderator-title" className="section__title">
                        <span className="section__title-icon">🎙️</span>
                        Session Moderator
                        <span className="section__title-line" />
                    </h2>

                    <article className="panelist-card panelist-card--moderator panelist-card--featured">
                        <span className="panelist-card__badge panelist-card__badge--moderator">Moderator</span>
                        <div className="panelist-card__image-container">
                            <Image
                                src={moderator.image}
                                alt={moderator.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 280px"
                                className="panelist-card__image"
                            />
                            <div className="panelist-card__overlay" />
                        </div>
                        <div className="panelist-card__content">
                            <h3 className="panelist-card__name">{moderator.name}</h3>
                            <p className="panelist-card__designation">{moderator.designation}</p>
                            {moderator.organization && (
                                <p className="panelist-card__organization">{moderator.organization}</p>
                            )}

                            {/* About */}
                            <div className="panelist-card__section">
                                <h4 className="panelist-card__section-title">
                                    <span className="panelist-card__section-icon">👤</span>
                                    About
                                </h4>
                                <ul className="panelist-card__list panelist-card__list--about">
                                    {moderator.about.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>
                </section>



                {/* Back to RSVP CTA */}
                <section className="section text-center">
                    <Link href="/" className="btn btn--primary">
                        ← Back to RSVP
                    </Link>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer__content">
                    <div className="footer__logos">
                        <Image
                            src="/images/indian-army-logo-transparent.png"
                            alt="Indian Army"
                            width={60}
                            height={60}
                            className="footer__logo footer__logo--army"
                        />
                        <Image
                            src="/images/DGIS logo.png"
                            alt="DGIS"
                            width={60}
                            height={60}
                            className="footer__logo footer__logo--dgis"
                        />
                        <Image
                            src="/images/AI Summit logo.png"
                            alt="India AI Summit"
                            width={60}
                            height={60}
                            className="footer__logo footer__logo--summit"
                        />
                    </div>
                    <p className="footer__disclaimer">
                        Nomination or invitation by the Indian Army does not replace official
                        Summit registration and does not guarantee reserved seating. Entry
                        shall be subject to registration, security checks and venue capacity.
                    </p>
                    <p className="footer__copyright">
                        © 2026 India AI Impact Summit & Expo • Defence Panel curated by the Indian Army
                    </p>
                </div>
            </footer>
        </div>
    );
}
