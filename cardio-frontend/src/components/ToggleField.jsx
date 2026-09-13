import React from 'react';

const ToggleField = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="toggle-group">
        {options.map((opt) => (
          <React.Fragment key={`${name}-${opt.value}`}>
            <input
              type="radio"
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              checked={value === String(opt.value) || value === opt.value}
              onChange={(e) => onChange({ target: { name, value: opt.value } })}
              className="toggle-input"
            />
            <label htmlFor={`${name}-${opt.value}`} className="toggle-label">
              {opt.label}
            </label>
          </React.Fragment>
        ))}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default ToggleField;
