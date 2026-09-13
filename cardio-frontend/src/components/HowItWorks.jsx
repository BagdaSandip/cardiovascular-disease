import React from 'react';
import { ClipboardList, Cpu, BarChart2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Enter Your Information',
    desc: 'Provide personal metrics, blood pressure readings, cholesterol, glucose, and lifestyle data through the guided assessment form.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Model Analyzes Data',
    desc: 'A Logistic Regression model processes your 11 health indicators against patterns learned from over 70,000 clinical records.',
  },
  {
    number: '03',
    icon: BarChart2,
    title: 'Review Your Prediction',
    desc: 'Receive a clear risk classification with a confidence score and a summary of the factors included in the assessment.',
  },
];

const HowItWorks = () => (
  <section className="section" id="how-it-works">
    <div className="section-header">
      <div className="section-eyebrow">
        <Cpu size={14} />
        Process
      </div>
      <h2>How It Works</h2>
      <p>A transparent, three-step process from data entry to risk assessment.</p>
    </div>

    <div className="steps-grid">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <div
            key={step.number}
            className={`step-card animate-up delay-${i + 1}`}
          >
            <div className="step-number">{step.number}</div>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--r-md)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'var(--accent-mid)',
              }}
            >
              <Icon size={20} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        );
      })}
    </div>
  </section>
);

export default HowItWorks;
