import React, { useState, useEffect } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const empty = { name: '', email: '', age: '' };

function validate(fields) {
  const errs = {};
  if (!fields.name.trim()) errs.name = 'Name is required';
  else if (fields.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
  if (!fields.email.trim()) errs.email = 'Email is required';
  else if (!EMAIL_RE.test(fields.email)) errs.email = 'Enter a valid email address';
  if (!fields.age) errs.age = 'Age is required';
  else if (isNaN(fields.age) || +fields.age < 5 || +fields.age > 100)
    errs.age = 'Age must be between 5 and 100';
  return errs;
}

export default function StudentForm({ initial, onSubmit, onCancel, loading }) {
  const [fields, setFields] = useState(initial || empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setFields(initial || empty);
    setErrors({});
    setTouched({});
  }, [initial]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const errs = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, age: true });
    if (Object.keys(errs).length > 0) return;
    onSubmit({ name: fields.name.trim(), email: fields.email.trim(), age: +fields.age });
  }

  const isEdit = !!initial;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-tag">{isEdit ? 'EDIT RECORD' : 'NEW RECORD'}</span>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <h2 className="modal-title">{isEdit ? 'Update Student' : 'Add Student'}</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label className="field-label">Full Name</label>
            <input
              className={`field-input ${errors.name && touched.name ? 'field-input--error' : ''}`}
              name="name"
              value={fields.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="name"
              autoComplete="off"
            />
            {errors.name && touched.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field-group">
            <label className="field-label">Email Address</label>
            <input
              className={`field-input ${errors.email && touched.email ? 'field-input--error' : ''}`}
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="email"
              autoComplete="off"
            />
            {errors.email && touched.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field-group">
            <label className="field-label">Age</label>
            <input
              className={`field-input ${errors.age && touched.age ? 'field-input--error' : ''}`}
              name="age"
              type="number"
              value={fields.age}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="age"
              min="5"
              max="100"
            />
            {errors.age && touched.age && <span className="field-error">{errors.age}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              {loading ? <span className="spinner" /> : isEdit ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
