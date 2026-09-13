import React from 'react';
import { Activity, ChevronRight, Database } from 'lucide-react';

const Hero = () => (
  <section className="hero" id="dashboard">
    <div className="hero-grid-overlay" />

    <div className="hero-inner">
      {/* Badge */}
      <div className="hero-badge">
        <div className="hero-badge-dot" />
        <span>Machine Learning · Cardiovascular Risk Assessment</span>
      </div>

      {/* Headline */}
      <h1>
        Understand Your{' '}
        <span>Cardiovascular Risk</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle">
        Analyze key health indicators using a Logistic Regression model trained
        on over 70,000 clinical records to identify patterns associated with cardiovascular disease.
      </p>

      {/* CTA */}
      <div className="hero-actions">
        <a href="#assessment" className="btn btn-hero">
          <Activity size={18} />
          Start Assessment
          <ChevronRight size={16} />
        </a>
        <a href="#how-it-works" className="btn btn-ghost">
          How It Works
        </a>
      </div>

      {/* Trust Stats */}
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-value">70 K+</div>
          <div className="hero-stat-label">Training Records</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-value">11</div>
          <div className="hero-stat-label">Health Indicators</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-value" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Database size={18} />
            <span>LR</span>
          </div>
          <div className="hero-stat-label">Logistic Regression</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-value">Binary</div>
          <div className="hero-stat-label">Classification</div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
