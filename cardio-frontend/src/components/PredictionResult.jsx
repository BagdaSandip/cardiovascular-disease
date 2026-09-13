import React from 'react';
import {
  ShieldCheck, ShieldAlert, RefreshCcw,
  User, Heart, FlaskConical, Activity,
} from 'lucide-react';
import ConfidenceRing from './ProbabilityIndicator';
import AssessmentSummary from './AssessmentSummary';
import Disclaimer from './Disclaimer';

/* What influences the assessment */
const FACTORS = [
  {
    icon: User,
    cls: 'icon-blue',
    title: 'Personal Factors',
    desc: 'Age, biological sex, height, and weight affect baseline cardiovascular risk.',
  },
  {
    icon: Heart,
    cls: 'icon-teal',
    title: 'Blood Pressure',
    desc: 'Systolic and diastolic BP are two of the strongest predictors in the model.',
  },
  {
    icon: FlaskConical,
    cls: 'icon-violet',
    title: 'Health Indicators',
    desc: 'Cholesterol and glucose levels reflect metabolic state and vascular health.',
  },
  {
    icon: Activity,
    cls: 'icon-green',
    title: 'Lifestyle Habits',
    desc: 'Smoking, alcohol use, and physical activity modify long-term risk profiles.',
  },
];

const PredictionResult = ({ result, onReset }) => {
  const isHighRisk = result.prediction === 1;

  return (
    <section>
      <div className="result-card">
        {/* ── Result Header ── */}
        <div className={`result-header ${isHighRisk ? 'danger-bg' : 'success-bg'}`}>
          {/* Status tag */}
          <div className={`result-status-tag ${isHighRisk ? 'danger' : 'success'}`}>
            {isHighRisk ? <ShieldAlert size={13} /> : <ShieldCheck size={13} />}
            {isHighRisk ? 'Elevated Risk Detected' : 'No Significant Risk Detected'}
          </div>

          {/* Icon */}
          <div className={`result-icon-wrap ${isHighRisk ? 'danger' : 'success'}`}>
            {isHighRisk
              ? <ShieldAlert size={38} strokeWidth={1.75} />
              : <ShieldCheck size={38} strokeWidth={1.75} />}
          </div>

          {/* Title */}
          <h2 className="result-title">
            {isHighRisk
              ? 'Risk Pattern Identified'
              : 'No Significant Risk Detected'}
          </h2>

          {/* Description */}
          <p className="result-desc">
            {isHighRisk
              ? 'The machine learning model identified patterns in your health profile that are associated with cardiovascular disease. Consider discussing these results with a healthcare professional.'
              : 'Your health profile has been analyzed. The machine learning model did not detect significant patterns associated with cardiovascular disease at this time.'}
          </p>

          {/* Confidence Ring */}
          {result.probability != null && (
            <ConfidenceRing
              probability={result.probability}
              isHighRisk={isHighRisk}
            />
          )}
        </div>

        {/* ── Result Body ── */}
        <div className="result-body">
          {/* Assessment Summary */}
          {result.input && <AssessmentSummary input={result.input} />}

          {/* Divider */}
          <div className="divider-label" style={{ marginTop: '2.5rem' }}>
            <span>What Influences the Assessment</span>
          </div>

          {/* Explainability grid */}
          <div className="explain-grid" style={{ marginTop: '1.25rem' }}>
            {FACTORS.map((f) => {
              const Icon = f.icon;
              return (
                <div className="explain-item" key={f.title}>
                  <div className={`explain-icon ${f.cls}`}>
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <Disclaimer />
        </div>

        {/* ── Model Strip ── */}
        <div className="result-model-strip">
          <div className="result-model-item">
            <div className="result-model-item-label">Model</div>
            <div className="result-model-item-value">Logistic Regression</div>
          </div>
          <div className="result-model-item">
            <div className="result-model-item-label">Type</div>
            <div className="result-model-item-value">Binary Classification</div>
          </div>
          <div className="result-model-item">
            <div className="result-model-item-label">Framework</div>
            <div className="result-model-item-value">Scikit-learn</div>
          </div>
          <div className="result-model-item">
            <div className="result-model-item-label">API</div>
            <div className="result-model-item-value">Flask REST</div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="result-actions">
          <button className="btn btn-outline" onClick={onReset} id="new-assessment-btn">
            <RefreshCcw size={17} />
            Start New Assessment
          </button>
        </div>
      </div>
    </section>
  );
};

export default PredictionResult;
