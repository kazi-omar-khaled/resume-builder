import React from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  FileText,
  LayoutTemplate,
  Wand2,
  Download,
  Target,
  FileStack,
} from "lucide-react";

import "./landing.css";

const Homepage = () => {
  return (
    <div className="landing">
      <div className="landing__ambient" aria-hidden>
        <div className="landing__orb landing__orb--1" />
        <div className="landing__orb landing__orb--2" />
        <div className="landing__orb landing__orb--3" />
        <div className="landing__grid" />
      </div>

      <div className="landing__content">
        <header className="landing-nav">
          <nav className="landing-nav__glass" aria-label="Primary">
            <Link to="/" className="landing-nav__brand">
              <span className="landing-nav__mark" aria-hidden>
                <FileStack size={18} strokeWidth={2.4} />
              </span>
              Resume Studio
            </Link>

            <div className="landing-nav__links landing-nav__links--desktop">
              <a className="landing-nav__link" href="#features">
                Features
              </a>
              <a className="landing-nav__link" href="#workflow">
                Workflow
              </a>
              <a className="landing-nav__link" href="#cta">
                Get started
              </a>
            </div>

            <div className="landing-nav__actions">
              <Link to="/login" className="landing-btn landing-btn--ghost">
                Log in
              </Link>
              <Link to="/app" className="landing-btn landing-btn--primary">
                Get started
              </Link>
            </div>
          </nav>
        </header>

        <main>
          <section className="landing-hero" aria-labelledby="hero-heading">
            <div className="landing-hero__eyebrow">
              <span>New</span>
              <Sparkles size={14} strokeWidth={2.5} aria-hidden />
              AI-assisted resume parsing &amp; polish
            </div>

            <h1 id="hero-heading" className="landing-hero__title">
              A resume that reads <em>sharp</em>—in minutes, not hours.
            </h1>

            <p className="landing-hero__lead">
              Structure your story with refined templates, intelligent drafting
              helpers, and exports hiring teams actually open. Built for clarity,
              contrast, and calm focus.
            </p>

            <div className="landing-hero__cta">
              <Link to="/app" className="landing-btn landing-btn--primary">
                Start building
              </Link>
              <Link
                to="/login"
                className="landing-btn landing-btn--outline"
              >
                I already have an account
              </Link>
            </div>

            <div className="landing-hero__preview">
              <div className="landing-hero__float landing-hero__float--a">
                ATS-friendly layout
                <small>Clean hierarchy &amp; scan paths</small>
              </div>
              <div className="landing-hero__float landing-hero__float--b">
                PDF upload
                <small>We structure your content</small>
              </div>

              <div className="landing-hero__preview-frame">
                <div className="landing-hero__preview-inner">
                  <div className="landing-mock" aria-hidden>
                    <div className="landing-mock__rail">
                      <div className="landing-mock__dot" />
                      <div className="landing-mock__dot" />
                      <div className="landing-mock__dot" />
                      <div className="landing-mock__line" />
                      <div className="landing-mock__line" />
                    </div>
                    <div className="landing-mock__body">
                      <div className="landing-mock__block" />
                      <div className="landing-mock__block landing-mock__block--sm" />
                      <div className="landing-mock__rows">
                        <div className="landing-mock__row" />
                        <div className="landing-mock__row" />
                        <div className="landing-mock__row" />
                        <div className="landing-mock__row" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="landing-stats" aria-label="Highlights">
            <div className="landing-stat">
              <div className="landing-stat__value">4+</div>
              <div className="landing-stat__label">
                Distinct templates tuned for readability
              </div>
            </div>
            <div className="landing-stat">
              <div className="landing-stat__value">AI</div>
              <div className="landing-stat__label">
                Summaries &amp; job bullets you can refine
              </div>
            </div>
            <div className="landing-stat">
              <div className="landing-stat__value">1-click</div>
              <div className="landing-stat__label">
                Print-ready preview &amp; shareable view
              </div>
            </div>
          </section>

          <section
            id="features"
            className="landing-features"
            aria-labelledby="features-heading"
          >
            <div className="landing-features__head">
              <h2 id="features-heading">Everything you need, nothing noisy</h2>
              <p>
                A focused toolkit for professionals who want their materials to
                feel intentional—strong type, balanced spacing, and sensible
                defaults.
              </p>
            </div>

            <div className="landing-features__grid">
              <article className="landing-feature">
                <div className="landing-feature__icon">
                  <Wand2 size={22} strokeWidth={2} />
                </div>
                <h3>AI writing assists</h3>
                <p>
                  Tighten summaries and role descriptions with suggestions you
                  control—edit, accept, or rewrite in your own voice.
                </p>
              </article>

              <article className="landing-feature">
                <div className="landing-feature__icon">
                  <FileText size={22} strokeWidth={2} />
                </div>
                <h3>PDF intelligence</h3>
                <p>
                  Upload an existing resume and let the app propose structure so
                  you are not retyping from scratch.
                </p>
              </article>

              <article className="landing-feature">
                <div className="landing-feature__icon">
                  <LayoutTemplate size={22} strokeWidth={2} />
                </div>
                <h3>Template gallery</h3>
                <p>
                  Classic, modern, and minimal layouts with consistent rhythm so
                  recruiters can scan fast.
                </p>
              </article>

              <article className="landing-feature">
                <div className="landing-feature__icon">
                  <Target size={22} strokeWidth={2} />
                </div>
                <h3>Role-ready structure</h3>
                <p>
                  Sections for experience, projects, education, and skills—mapped
                  to how hiring teams evaluate candidates.
                </p>
              </article>

              <article className="landing-feature">
                <div className="landing-feature__icon">
                  <Download size={22} strokeWidth={2} />
                </div>
                <h3>Export &amp; print</h3>
                <p>
                  Open a polished preview, then print or save to PDF with
                  predictable margins and typography.
                </p>
              </article>

              <article className="landing-feature" id="workflow">
                <div className="landing-feature__icon">
                  <Sparkles size={22} strokeWidth={2} />
                </div>
                <h3>Polished UI</h3>
                <p>
                  Measured contrast, soft motion, and a calm palette so you can
                  work longer without visual fatigue.
                </p>
              </article>
            </div>
          </section>

          <section id="cta" className="landing-cta" aria-labelledby="cta-heading">
            <div className="landing-cta__inner">
              <h2 id="cta-heading">Ready when you are</h2>
              <p>
                Jump into the dashboard, pick a template, and ship a resume that
                matches the quality of your experience.
              </p>
              <div className="landing-cta__actions">
                <Link to="/app" className="landing-btn landing-btn--primary">
                  Open dashboard
                </Link>
                <Link
                  to="/login"
                  className="landing-btn landing-btn--outline"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="landing-footer">
          <p>
            © {new Date().getFullYear()} Resume Studio · Crafted for focused job
            search ·{" "}
            <Link to="/login">Account</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
