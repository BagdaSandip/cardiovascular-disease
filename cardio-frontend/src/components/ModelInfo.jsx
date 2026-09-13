import React from 'react';
import { GitBranch, Layers, Tag, Database } from 'lucide-react';

const ModelInfo = () => (
  <section className="section" id="model-info">
    <div className="model-info-card animate-up">
      {/* Left: details */}
      <div>
        <div style={{ marginBottom: '1.75rem' }}>
          <div className="model-info-label">Machine Learning Model</div>
          <div className="model-info-value" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
            Logistic Regression
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1.25rem',
          }}
        >
          <div>
            <div className="model-info-label">Prediction Type</div>
            <div className="model-info-value">Binary Classification</div>
          </div>
          <div>
            <div className="model-info-label">Output</div>
            <div className="model-info-value">Risk / No Significant Risk</div>
          </div>
          <div>
            <div className="model-info-label">Training Data</div>
            <div className="model-info-value">Cardiovascular Dataset</div>
          </div>
          <div>
            <div className="model-info-label">Input Features</div>
            <div className="model-info-value">11 Health Indicators</div>
          </div>
        </div>
      </div>

      {/* Right: badge chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', position: 'relative', zIndex: 1 }}>
        <span className="model-badge"><GitBranch size={14} /> Scikit-learn</span>
        <span className="model-badge"><Layers size={14} /> Pipeline + StandardScaler</span>
        <span className="model-badge"><Tag size={14} /> .pkl Model File</span>
        <span className="model-badge"><Database size={14} /> Flask REST API</span>
      </div>
    </div>
  </section>
);

export default ModelInfo;
