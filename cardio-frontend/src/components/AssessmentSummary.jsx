import React from 'react';
import { User, Heart, FlaskConical, Activity } from 'lucide-react';

const levelLabel = (val) => {
  const map = { '1': 'Normal', '2': 'Above Normal', '3': 'Well Above Normal' };
  return map[String(val)] || val;
};

const levelBadge = (val) => {
  const cls = { '1': 'badge-normal', '2': 'badge-above', '3': 'badge-high' };
  return cls[String(val)] || 'badge-no';
};

const yesNo = (val) => (String(val) === '1' ? 'Yes' : 'No');
const yesNoBadge = (val) => (String(val) === '1' ? 'badge-yes' : 'badge-no');

const genderLabel = (val) => (String(val) === '2' ? 'Male' : 'Female');

const Row = ({ label, children }) => (
  <tr>
    <td>{label}</td>
    <td>{children}</td>
  </tr>
);

const Badge = ({ cls, children }) => (
  <span className={`summary-badge ${cls}`}>{children}</span>
);

const AssessmentSummary = ({ input }) => {
  if (!input) return null;
  const {
    age, gender, height, weight,
    ap_hi, ap_lo,
    cholesterol, gluc,
    smoke, alco, active,
  } = input;

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="divider-label">
        <span>Assessment Summary</span>
      </div>

      {/* Personal */}
      <div className="summary-section">
        <div className="summary-section-title">
          <User size={15} style={{ color: 'var(--primary-light)' }} />
          Personal
        </div>
        <table className="summary-table">
          <tbody>
            <Row label="Age">{age} years</Row>
            <Row label="Gender">{genderLabel(gender)}</Row>
            <Row label="Height">{height} cm</Row>
            <Row label="Weight">{weight} kg</Row>
          </tbody>
        </table>
      </div>

      {/* Blood Pressure */}
      <div className="summary-section">
        <div className="summary-section-title">
          <Heart size={15} style={{ color: 'var(--accent-mid)' }} />
          Blood Pressure
        </div>
        <table className="summary-table">
          <tbody>
            <Row label="Systolic (upper)">{ap_hi} mmHg</Row>
            <Row label="Diastolic (lower)">{ap_lo} mmHg</Row>
          </tbody>
        </table>
      </div>

      {/* Health */}
      <div className="summary-section">
        <div className="summary-section-title">
          <FlaskConical size={15} style={{ color: '#7c3aed' }} />
          Health Indicators
        </div>
        <table className="summary-table">
          <tbody>
            <Row label="Cholesterol">
              <Badge cls={levelBadge(cholesterol)}>{levelLabel(cholesterol)}</Badge>
            </Row>
            <Row label="Glucose">
              <Badge cls={levelBadge(gluc)}>{levelLabel(gluc)}</Badge>
            </Row>
          </tbody>
        </table>
      </div>

      {/* Lifestyle */}
      <div className="summary-section">
        <div className="summary-section-title">
          <Activity size={15} style={{ color: 'var(--success)' }} />
          Lifestyle
        </div>
        <table className="summary-table">
          <tbody>
            <Row label="Smoking">
              <Badge cls={yesNoBadge(smoke)}>{yesNo(smoke)}</Badge>
            </Row>
            <Row label="Alcohol Use">
              <Badge cls={yesNoBadge(alco)}>{yesNo(alco)}</Badge>
            </Row>
            <Row label="Physical Activity">
              <Badge cls={yesNoBadge(active)}>{yesNo(active)}</Badge>
            </Row>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssessmentSummary;
