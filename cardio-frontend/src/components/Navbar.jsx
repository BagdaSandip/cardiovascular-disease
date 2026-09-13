import React, { useState } from 'react';
import { Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Assessment', href: '#assessment' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Model Info', href: '#model-info' },
  ];

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-inner">
          {/* Brand */}
          <a href="#dashboard" className="navbar-brand">
            <div className="navbar-brand-icon">
              <Activity size={18} strokeWidth={2.5} />
            </div>
            <span className="navbar-brand-name">
              Cardio<span>Sense</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="navbar-links">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="navbar-link">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a href="#assessment" className="navbar-cta">
            Start Assessment
          </a>

          {/* Mobile hamburger */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="navbar-mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#assessment"
          className="btn btn-primary"
          style={{ marginTop: '0.5rem', borderRadius: 'var(--r-md)', padding: '0.75rem 1rem' }}
          onClick={() => setMobileOpen(false)}
        >
          Start Assessment
        </a>
      </div>
    </header>
  );
};

export default Navbar;
