import React from 'react';
import { Activity } from 'lucide-react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <a href="#dashboard" className="footer-brand">
        <div style={{
          width: 30, height: 30,
          borderRadius: 8,
          background: 'var(--brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}>
          <Activity size={15} strokeWidth={2.5} />
        </div>
        <span className="footer-brand-name">CardioSense</span>
      </a>

      <p className="footer-copy">
        © {new Date().getFullYear()} CardioSense · Educational ML Project · Not a medical diagnostic tool.
      </p>
    </div>
  </footer>
);

export default Footer;
