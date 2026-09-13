import React, { useState } from 'react';
import { Loader2, User, Heart, FlaskConical, Activity, AlertCircle } from 'lucide-react';
import { predictRisk } from '../api/predictionApi';

/* ─── Step Progress ─────────────────────────────── */
const STEPS = ['Personal', 'Blood Pressure', 'Health', 'Lifestyle'];

const StepProgress = ({ currentStep }) => (
  <div className="step-progress" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemax={STEPS.length}>
    {STEPS.map((label, i) => {
      const state = i < currentStep ? 'done' : i === currentStep ? 'active' : '';
      return (
        <React.Fragment key={label}>
          <div className={`step-progress-item ${state}`}>
            <div className="step-pip">
              <div className="step-pip-circle">
                {i < currentStep ? '✓' : `0${i + 1}`}
              </div>
              <span className="step-pip-label">{label}</span>
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`step-progress-line ${i < currentStep ? 'done' : ''}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/* ─── Segmented Control ─────────────────────────── */
const SegControl = ({ name, value, options, onChange, error, accent = true }) => (
  <div className={`seg-group ${error ? 'seg-error' : ''}`} role="group">
    {options.map((opt) => (
      <React.Fragment key={`${name}-${opt.value}`}>
        <input
          type="radio"
          id={`${name}-${opt.value}`}
          name={name}
          value={opt.value}
          checked={String(value) === String(opt.value)}
          onChange={() => onChange({ target: { name, value: opt.value } })}
          className="seg-input"
        />
        <label
          htmlFor={`${name}-${opt.value}`}
          className={`seg-label ${accent ? 'accent' : ''}`}
        >
          {opt.label}
        </label>
      </React.Fragment>
    ))}
  </div>
);

/* ─── Input Field ───────────────────────────────── */
const Field = ({ label, name, value, onChange, placeholder, error, unit, hint }) => (
  <div className="form-group">
    <label htmlFor={name} className="form-label">
      {label}
      {hint && <span className="form-label-hint">{hint}</span>}
    </label>
    <div className="input-wrapper">
      <input
        id={name}
        name={name}
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-input ${unit ? 'has-unit' : ''} ${error ? 'input-error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {unit && <span className="input-unit">{unit}</span>}
    </div>
    {error && (
      <span className="error-text" id={`${name}-error`} role="alert">
        <AlertCircle size={13} /> {error}
      </span>
    )}
  </div>
);

/* ─── Section Card ──────────────────────────────── */
const SectionCard = ({ icon: Icon, iconClass, title, desc, children, step, className = '' }) => (
  <div className={`form-section-card animate-up delay-${step} ${className}`}>
    <div className="form-section-header">
      <div className={`form-section-icon ${iconClass}`}>
        <Icon size={22} strokeWidth={2} />
      </div>
      <div>
        <div className="form-section-title">{title}</div>
        <p className="form-section-desc">{desc}</p>
      </div>
    </div>
    {children}
  </div>
);

/* ─── Main Form ─────────────────────────────────── */
const AssessmentForm = ({ onResult }) => {
  const [formData, setFormData] = useState({
    age:         '',
    gender:      '1',
    height:      '',
    weight:      '',
    ap_hi:       '',
    ap_lo:       '',
    cholesterol: '1',
    gluc:        '1',
    smoke:       '0',
    alco:        '0',
    active:      '1',
  });

  const [errors, setErrors]       = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [apiError, setApiError]   = useState(null);
  const [loading, setLoading]     = useState(false);

  /* Which step is "active" based on first empty required field */
  const activeStep = (() => {
    if (!formData.age || !formData.height || !formData.weight) return 0;
    if (!formData.ap_hi || !formData.ap_lo) return 1;
    return 2;
  })();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    if (generalError) setGeneralError(null);
  };

  const validate = () => {
    const newErrors = {};
    const empty = (v) => v === '' || v === null || v === undefined;

    if (empty(formData.age))    newErrors.age    = 'Age is required';
    else if (+formData.age <= 0) newErrors.age   = 'Please enter a valid age.';
    else if (+formData.age > 120) newErrors.age  = 'Please enter a realistic age.';

    if (empty(formData.height))    newErrors.height = 'Height is required';
    else if (+formData.height <= 0) newErrors.height = 'Please enter a valid height.';

    if (empty(formData.weight))    newErrors.weight = 'Weight is required';
    else if (+formData.weight <= 0) newErrors.weight = 'Please enter a valid weight.';

    if (empty(formData.ap_hi))    newErrors.ap_hi = 'Systolic blood pressure is required';
    else if (+formData.ap_hi <= 0) newErrors.ap_hi = 'Please enter a valid systolic BP.';

    if (empty(formData.ap_lo))    newErrors.ap_lo = 'Diastolic blood pressure is required';
    else if (+formData.ap_lo <= 0) newErrors.ap_lo = 'Please enter a valid diastolic BP.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setGeneralError('Please complete all required fields before continuing.');
      return false;
    }
    setGeneralError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) {
      // Scroll to first error
      const firstError = document.querySelector('.input-error, .seg-error');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        active:      Number(formData.active),
        gender:      Number(formData.gender),
        height:      Number(formData.height),
        weight:      Number(formData.weight),
        ap_hi:       Number(formData.ap_hi),
        ap_lo:       Number(formData.ap_lo),
        cholesterol: Number(formData.cholesterol),
        gluc:        Number(formData.gluc),
        smoke:       Number(formData.smoke),
        alco:        Number(formData.alco),
        age:         Number(formData.age),
      };
      const result = await predictRisk(payload);
      onResult({ ...result, input: formData });
    } catch (err) {
      setApiError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="assessment">
      {/* Header */}
      <div className="assessment-header animate-up">
        <h2>Health Assessment</h2>
        <p>Complete all four sections below to receive your cardiovascular risk prediction.</p>
      </div>

      {/* Step Progress */}
      <StepProgress currentStep={activeStep} />

      <form onSubmit={handleSubmit} noValidate>
        {/* Error banners */}
        {generalError && (
          <div className="error-banner" role="alert">
            <AlertCircle size={18} className="error-banner-icon" />
            <p className="error-banner-text">{generalError}</p>
          </div>
        )}
        {apiError && (
          <div className="error-banner" role="alert">
            <AlertCircle size={18} className="error-banner-icon" />
            <p className="error-banner-text">{apiError}</p>
          </div>
        )}

        {/* Section 1 — Personal */}
        <SectionCard
          icon={User}
          iconClass="icon-blue"
          title="Personal Information"
          desc="Basic biometric data used to establish baseline health context."
          step={1}
        >
          <div className="form-grid">
            <Field
              label="Age" name="age" value={formData.age}
              onChange={handleChange} placeholder="e.g. 45"
              unit="yrs" error={errors.age}
            />
            <div className="form-group">
              <label className="form-label">Gender</label>
              <SegControl
                name="gender" value={formData.gender} onChange={handleChange}
                options={[
                  { label: '♀ Female', value: '1' },
                  { label: '♂ Male',   value: '2' },
                ]}
              />
            </div>
            <Field
              label="Height" name="height" value={formData.height}
              onChange={handleChange} placeholder="e.g. 170"
              unit="cm" error={errors.height}
            />
            <Field
              label="Weight" name="weight" value={formData.weight}
              onChange={handleChange} placeholder="e.g. 70"
              unit="kg" error={errors.weight}
            />
          </div>
        </SectionCard>

        {/* Section 2 — Blood Pressure */}
        <SectionCard
          icon={Heart}
          iconClass="icon-teal"
          title="Blood Pressure"
          desc="Systolic pressure is the higher number; diastolic is the lower number."
          step={2}
        >
          <div className="form-grid">
            <Field
              label="Systolic BP" name="ap_hi" value={formData.ap_hi}
              onChange={handleChange} placeholder="e.g. 120"
              unit="mmHg" error={errors.ap_hi}
              hint="(upper)"
            />
            <Field
              label="Diastolic BP" name="ap_lo" value={formData.ap_lo}
              onChange={handleChange} placeholder="e.g. 80"
              unit="mmHg" error={errors.ap_lo}
              hint="(lower)"
            />
          </div>
        </SectionCard>

        {/* Section 3 — Health Indicators */}
        <SectionCard
          icon={FlaskConical}
          iconClass="icon-violet"
          title="Health Indicators"
          desc="Select the category that best matches your most recent lab results."
          step={3}
        >
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Cholesterol Level</label>
              <SegControl
                name="cholesterol" value={formData.cholesterol} onChange={handleChange}
                options={[
                  { label: 'Normal',          value: '1' },
                  { label: 'Above Normal',     value: '2' },
                  { label: 'Well Above',       value: '3' },
                ]}
                error={errors.cholesterol}
              />
              {errors.cholesterol && (
                <span className="error-text"><AlertCircle size={13} /> {errors.cholesterol}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Glucose Level</label>
              <SegControl
                name="gluc" value={formData.gluc} onChange={handleChange}
                options={[
                  { label: 'Normal',          value: '1' },
                  { label: 'Above Normal',     value: '2' },
                  { label: 'Well Above',       value: '3' },
                ]}
                error={errors.gluc}
              />
              {errors.gluc && (
                <span className="error-text"><AlertCircle size={13} /> {errors.gluc}</span>
              )}
            </div>
          </div>
        </SectionCard>

        {/* Section 4 — Lifestyle */}
        <SectionCard
          icon={Activity}
          iconClass="icon-green"
          title="Lifestyle Factors"
          desc="Habits and behaviors that contribute to cardiovascular health outcomes."
          step={4}
        >
          <div className="form-grid form-grid-3">
            <div className="form-group">
              <label className="form-label">Smoking</label>
              <SegControl
                name="smoke" value={formData.smoke} onChange={handleChange}
                options={[
                  { label: 'No',  value: '0' },
                  { label: 'Yes', value: '1' },
                ]}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Alcohol Use</label>
              <SegControl
                name="alco" value={formData.alco} onChange={handleChange}
                options={[
                  { label: 'No',  value: '0' },
                  { label: 'Yes', value: '1' },
                ]}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Physical Activity</label>
              <SegControl
                name="active" value={formData.active} onChange={handleChange}
                options={[
                  { label: 'No',  value: '0' },
                  { label: 'Yes', value: '1' },
                ]}
              />
            </div>
          </div>
        </SectionCard>

        {/* Submit */}
        <div className="form-submit-area animate-up delay-4">
          <button
            type="submit"
            className="btn btn-primary btn-full btn-lg"
            disabled={loading}
            id="analyze-btn"
          >
            {loading ? (
              <>
                <Loader2 className="spinner" size={20} />
                Analyzing your profile…
              </>
            ) : (
              <>
                <Activity size={20} />
                Analyze My Profile
              </>
            )}
          </button>
          <p className="form-submit-hint">
            Your data is processed locally and never stored.
          </p>
        </div>
      </form>
    </section>
  );
};

export default AssessmentForm;
