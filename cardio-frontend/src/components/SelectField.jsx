import React from 'react';

const SelectField = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default SelectField;
