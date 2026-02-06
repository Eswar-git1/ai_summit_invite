/**
 * Defence Panel RSVP - Main Page
 * India AI Impact Summit & Expo 2026
 * Curated by the Indian Army
 *
 * Olive Green Army Theme with Neural Network Animations
 */

"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import NeuralBackground from "@/components/NeuralBackground";
import CountdownTimer from "@/components/CountdownTimer";

// RSVP Status options
type RSVPStatus = "attending" | "not_attending" | "tentative";

interface FormData {
  fullName: string;
  organisation: string;
  designation: string;
  email: string;
  mobile: string;
  rsvpStatus: RSVPStatus;
}

interface FormErrors {
  fullName?: string;
  organisation?: string;
  email?: string;
}

export default function DefencePanelRSVP() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    organisation: "",
    designation: "",
    email: "",
    mobile: "",
    rsvpStatus: "attending",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.organisation.trim()) {
      newErrors.organisation = "Organisation is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("RSVP submission error:", error);
      setSubmitError(
        "There was an error submitting your RSVP. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // RSVP Status label mapping
  const getStatusLabel = (status: RSVPStatus): string => {
    const labels: Record<RSVPStatus, string> = {
      attending: "Attending",
      not_attending: "Not Attending",
      tentative: "Tentative",
    };
    return labels[status];
  };

  return (
    <div className="page-wrapper">
      {/* Neural Network Background Animation - Olive Green Theme */}
      <NeuralBackground
        nodeCount={50}
        connectionDistance={180}
        nodeColor="74, 111, 54"
        lineColor="74, 111, 54"
      />

      {/* Hero Header */}
      <header className="hero">
        <div className="hero__content">
          {/* Logos - Hierarchy: Indian Army, DGIS, AI Summit */}
          <div className="hero__logos">
            <Image
              src="/images/IA-logo-1.png"
              alt="Indian Army"
              width={120}
              height={120}
              className="hero__logo hero__logo--army"
              priority
            />
            <Image
              src="/images/DGIS logo.png"
              alt="DGIS - Directorate General of Information Systems"
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

          {/* Invitation Message */}
          <p className="hero__invitation">
            You are cordially invited to
          </p>

          {/* Badge */}
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Defence Session
          </div>

          {/* Title */}
          <h1 className="hero__title">
            Defence Panel Discussion
          </h1>
          <p className="hero__subtitle">
            Curated by the Indian Army
          </p>

          {/* Event Date */}
          <p className="hero__date">
            <strong>India AI Impact Summit & Expo 2026</strong>
            <br />
            18 February 2026 • New Delhi
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <Link href="/" className="nav__link nav__link--active">
          RSVP
        </Link>
        <Link href="/panelists" className="nav__link">
          Panelists
        </Link>
      </nav>

      {/* Main Content */}
      <main className="container">
        {/* Session Details */}
        <section className="section" aria-labelledby="session-title">
          <h2 id="session-title" className="section__title">
            <span className="section__title-icon">📋</span>
            Session Details
            <span className="section__title-line" />
          </h2>

          <div className="card">
            <div className="card__body">
              <div className="session-grid">
                <div className="session-item">
                  <span className="session-item__label">Session Title</span>
                  <span className="session-item__value">Defence Perspective in AI</span>
                </div>
                <div className="session-item">
                  <span className="session-item__label">Date</span>
                  <span className="session-item__value">18 February 2026</span>
                </div>
                <div className="session-item">
                  <span className="session-item__label">Time</span>
                  <span className="session-item__value">9:30:00 AM – 10:25:00 AM</span>
                </div>
                <div className="session-item session-item--full">
                  <span className="session-item__label">Venue</span>
                  <span className="session-item__value">
                    West Wing Room 6, Bharat Mandapam, New Delhi
                  </span>
                </div>
                <div className="session-item session-item--full">
                  <span className="session-item__label">Format</span>
                  <span className="session-item__value">
                    Interactive Panel Discussion
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Countdown Timer */}
        <section className="section" aria-labelledby="countdown-title">
          <h2 id="countdown-title" className="section__title">
            <span className="section__title-icon">⏰</span>
            Time Until Event
            <span className="section__title-line" />
          </h2>
          <div className="card card--glass">
            <div className="card__body">
              <CountdownTimer />
            </div>
          </div>
        </section>


        {/* Event Information - Indian Army Participation */}
        <section className="section" aria-labelledby="event-info-title">
          <div className="notice notice--army">
            <div className="notice__header">
              <span className="notice__icon">🛡️</span>
              <h2 id="event-info-title" className="notice__title">
                Indian Army at the Summit
              </h2>
            </div>
            <p className="notice__text">
              The Indian Army is participating in the <strong>India AI Impact Summit & Expo 2026</strong>,
              held from <strong>16–20 February 2026</strong> at <strong>Bharat Mandapam, New Delhi</strong>.
              <br /><br />
              Visit the Indian Army's exhibition at <strong>Stall No. 4F-33</strong>
              showcasing <strong>AI-enabled defence technologies</strong> and ongoing digital transformation initiatives.
            </p>
          </div>
        </section>

        {/* Important Notice - Registration */}
        <section className="section" aria-labelledby="notice-title">
          <div className="notice">
            <div className="notice__header">
              <span className="notice__icon">⚠️</span>
              <h2 id="notice-title" className="notice__title">
                Important Notice
              </h2>
            </div>
            <p className="notice__text">
              This RSVP page is for <strong>attendance planning only</strong>.
              <br />
              All participants must mandatorily register on the official Summit
              website to gain entry to the venue.
            </p>
            <a
              href="https://impact.indiaai.gov.in/registration"
              target="_blank"
              rel="noopener noreferrer"
              className="notice__link"
              aria-label="Register on official Summit website (opens in new tab)"
            >
              Register Now
              <span className="notice__link-arrow">→</span>
            </a>
          </div>
        </section>

        {/* RSVP Form */}
        <section className="section" aria-labelledby="rsvp-title">
          <h2 id="rsvp-title" className="section__title">
            <span className="section__title-icon">✉️</span>
            RSVP for Defence Panel
            <span className="section__title-line" />
          </h2>

          <div className="card card--glass">
            <div className="card__body">
              {isSubmitted ? (
                <div className="success" role="alert" aria-live="polite">
                  <div className="success__icon">✓</div>
                  <h3 className="success__title">RSVP Submitted Successfully</h3>
                  <p className="success__text">
                    Thank you, <strong>{formData.fullName}</strong>. Your RSVP status
                    has been recorded as: <strong>{getStatusLabel(formData.rsvpStatus)}</strong>
                  </p>
                  <div className="success__reminder">
                    <strong>Reminder:</strong> Please ensure you complete your
                    official Summit registration at{" "}
                    <a
                      href="https://impact.indiaai.gov.in/registration"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      impact.indiaai.gov.in/registration
                    </a>
                  </div>
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit} noValidate>
                  {/* Row: Name & Email */}
                  <div className="form__row form__row--2">
                    <div className="form__group">
                      <label htmlFor="fullName" className="form__label form__label--required">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className={`form__input ${errors.fullName ? "form__input--error" : ""}`}
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                      />
                      {errors.fullName && (
                        <span className="form__error">⚠ {errors.fullName}</span>
                      )}
                    </div>

                    <div className="form__group">
                      <label htmlFor="email" className="form__label form__label--required">
                        Email ID
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form__input ${errors.email ? "form__input--error" : ""}`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <span className="form__error">⚠ {errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Row: Organisation & Designation */}
                  <div className="form__row form__row--2">
                    <div className="form__group">
                      <label
                        htmlFor="organisation"
                        className="form__label form__label--required"
                      >
                        Organisation / Institution
                      </label>
                      <input
                        type="text"
                        id="organisation"
                        name="organisation"
                        className={`form__input ${errors.organisation ? "form__input--error" : ""}`}
                        value={formData.organisation}
                        onChange={handleChange}
                        placeholder="Enter your organisation"
                        aria-required="true"
                        aria-invalid={!!errors.organisation}
                      />
                      {errors.organisation && (
                        <span className="form__error">⚠ {errors.organisation}</span>
                      )}
                    </div>

                    <div className="form__group">
                      <label htmlFor="designation" className="form__label">
                        Designation
                      </label>
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        className="form__input"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="Enter your designation (optional)"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="form__group">
                    <label htmlFor="mobile" className="form__label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      className="form__input"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number (optional)"
                    />
                  </div>

                  {/* RSVP Status */}
                  <div className="form__group">
                    <fieldset>
                      <legend className="form__label form__label--required">
                        RSVP Status
                      </legend>
                      <div className="radio-group">
                        <div className="radio-option">
                          <input
                            type="radio"
                            id="status-attending"
                            name="rsvpStatus"
                            value="attending"
                            checked={formData.rsvpStatus === "attending"}
                            onChange={handleChange}
                            className="radio-option__input"
                          />
                          <label htmlFor="status-attending" className="radio-option__label">
                            ✓ Attending
                          </label>
                        </div>
                        <div className="radio-option">
                          <input
                            type="radio"
                            id="status-not-attending"
                            name="rsvpStatus"
                            value="not_attending"
                            checked={formData.rsvpStatus === "not_attending"}
                            onChange={handleChange}
                            className="radio-option__input"
                          />
                          <label htmlFor="status-not-attending" className="radio-option__label">
                            ✗ Not Attending
                          </label>
                        </div>
                        <div className="radio-option">
                          <input
                            type="radio"
                            id="status-tentative"
                            name="rsvpStatus"
                            value="tentative"
                            checked={formData.rsvpStatus === "tentative"}
                            onChange={handleChange}
                            className="radio-option__input"
                          />
                          <label htmlFor="status-tentative" className="radio-option__label">
                            ? Tentative
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  {/* Submit Error */}
                  {submitError && (
                    <div className="form__error" role="alert">
                      ⚠ {submitError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn--primary btn--full"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="btn__spinner" aria-hidden="true" />
                        Submitting...
                      </>
                    ) : (
                      "Submit RSVP"
                    )}
                  </button>

                  {/* Privacy Note */}
                  <div className="privacy-note">
                    <svg
                      className="privacy-note__icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Information collected is solely for coordination of the Defence
                    Panel session.
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* View Panelists CTA */}
        <section className="section text-center">
          <Link href="/panelists" className="btn btn--primary">
            View Panelists & Moderator →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__logos">
            <Image
              src="/images/IA-logo-1.png"
              alt="Indian Army"
              width={120}
              height={120}
              className="hero__logo hero__logo--army"
              priority
            />
            <Image
              src="/images/DGIS logo.png"
              alt="DGIS"
              width={120}
              height={120}
              className="footer__logo footer__logo--dgis"
            />
            <Image
              src="/images/AI Summit logo.png"
              alt="India AI Summit"
              width={120}
              height={120}
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
