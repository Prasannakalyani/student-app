import React from 'react';

export default function ConfirmDialog({ student, onConfirm, onCancel, loading }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box modal-box--sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-tag modal-tag--danger">DELETE</span>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>
        <h2 className="modal-title">Remove Student?</h2>
        <p className="modal-body">
          You're about to permanently delete <strong>{student.name}</strong>. This action cannot be
          undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn--ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn--danger" onClick={onConfirm} disabled={loading}>
            {loading ? <span className="spinner" /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
