import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import ConfirmDialog from './components/ConfirmDialog';
import { useStudents } from './hooks/useStudents';
import { exportToExcel } from './hooks/useExport';
import './App.css';

export default function App() {
  const { filteredStudents, loading, search, setSearch, addStudent, updateStudent, deleteStudent } =
    useStudents();

  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'id', dir: 'asc' });

  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleAdd(data) {
    await addStudent(data);
    setShowAdd(false);
    showToast(`${data.name} added successfully`);
  }

  async function handleEdit(data) {
    await updateStudent(editTarget.id, data);
    setEditTarget(null);
    showToast(`${data.name} updated successfully`);
  }

  async function handleDelete() {
    const name = deleteTarget.name;
    await deleteStudent(deleteTarget.id);
    setDeleteTarget(null);
    showToast(`${name} removed`, 'warn');
  }

  function handleSort(key) {
    setSortConfig((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }
    );
  }

  const sorted = [...filteredStudents].sort((a, b) => {
    const { key, dir } = sortConfig;
    let av = a[key], bv = b[key];
    if (key === 'age') { av = +av; bv = +bv; }
    else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase(); }
    if (av < bv) return dir === 'asc' ? -1 : 1;
    if (av > bv) return dir === 'asc' ? 1 : -1;
    return 0;
  });

  function SortIcon({ col }) {
    if (sortConfig.key !== col) return <span className="sort-icon sort-icon--idle">⇅</span>;
    return <span className="sort-icon sort-icon--active">{sortConfig.dir === 'asc' ? '↑' : '↓'}</span>;
  }

  return (
    <div className="app">
      
      {toast && <div className={`toast toast--${toast.type}`}>{toast.msg}</div>}

      
      <header className="header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="brand-icon">S</div>
            <div>
              <div className="brand-title">StudentBase</div>
              <div className="brand-sub">Student Management System</div>
            </div>
          </div>
          <div className="header-meta">
            <span className="header-count">{filteredStudents.length} records</span>
          </div>
        </div>
      </header>

      
      <div className="controls-bar">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            placeholder="Search by name, email or age…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
        <div className="controls-right">
          <button className="btn btn--outline" onClick={() => exportToExcel(sorted)}>
            <span>↓</span> Export CSV
          </button>
          <button className="btn btn--primary" onClick={() => setShowAdd(true)}>
            <span>+</span> Add Student
          </button>
        </div>
      </div>

      
      <div className="table-wrap">
        {loading && (
          <div className="table-loading">
            <div className="loading-bar" />
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th className="th th--num">#</th>
              <th className="th th--sortable" onClick={() => handleSort('name')}>
                Name <SortIcon col="name" />
              </th>
              <th className="th th--sortable" onClick={() => handleSort('email')}>
                Email <SortIcon col="email" />
              </th>
              <th className="th th--sortable th--center" onClick={() => handleSort('age')}>
                Age <SortIcon col="age" />
              </th>
              <th className="th th--center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="td-empty">
                  <div className="empty-state">
                    <div className="empty-icon">◎</div>
                    <div className="empty-title">No students found</div>
                    <div className="empty-sub">Try adjusting your search or add a new student</div>
                  </div>
                </td>
              </tr>
            )}
            {sorted.map((s, i) => (
              <tr key={s.id} className="tr">
                <td className="td td--num">{i + 1}</td>
                <td className="td">
                  <div className="student-name">
                    <div className="avatar">{s.name.charAt(0)}</div>
                    <span>{s.name}</span>
                  </div>
                </td>
                <td className="td td--mono">{s.email}</td>
                <td className="td td--center">
                  <span className="age-badge">{s.age}</span>
                </td>
                <td className="td td--center">
                  <div className="action-group">
                    <button
                      className="action-btn action-btn--edit"
                      onClick={() => setEditTarget(s)}
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button
                      className="action-btn action-btn--delete"
                      onClick={() => setDeleteTarget(s)}
                      title="Delete"
                    >
                      ⌫
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <footer className="footer">
        Showing {sorted.length} of {filteredStudents.length} students
        {search && ` · filtered by "${search}"`}
      </footer>

      
      {showAdd && (
        <StudentForm onSubmit={handleAdd} onCancel={() => setShowAdd(false)} loading={loading} />
      )}
      {editTarget && (
        <StudentForm
          initial={editTarget}
          onSubmit={handleEdit}
          onCancel={() => setEditTarget(null)}
          loading={loading}
        />
      )}
      {deleteTarget && (
        <ConfirmDialog
          student={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={loading}
        />
      )}
    </div>
  );
}
