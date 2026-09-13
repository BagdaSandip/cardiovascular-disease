import React from 'react';

const InputField = ({ label, name, type = 'number', value, onChange, placeholder, error, min, max, unit }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          className="form-input"
          style={{ width: '100%', paddingRight: unit ? '3rem' : '1rem' }}
        />
        {unit && (
          <span style={{ 
            position: 'absolute', 
            right: '1rem', 
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            pointerEvents: 'none'
          }}>
            {unit}
          </span>
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default InputField;
