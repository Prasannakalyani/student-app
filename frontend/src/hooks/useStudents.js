import { useState, useCallback } from 'react';

const INITIAL_STUDENTS = [
  { id: 1, name: 'Arjun Mehta', email: 'arjun.mehta@university.edu', age: 21 },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@university.edu', age: 22 },
  { id: 3, name: 'Rohan Das', email: 'rohan.das@university.edu', age: 20 },
  { id: 4, name: 'Sneha Patel', email: 'sneha.patel@university.edu', age: 23 },
  { id: 5, name: 'Vikram Singh', email: 'vikram.singh@university.edu', age: 21 },
  { id: 6, name: 'Ananya Krishnan', email: 'ananya.k@university.edu', age: 24 },
];

let nextId = 7;

function simulateLoading(ms = 600) {
  return new Promise((res) => setTimeout(res, ms));
}

export function useStudents() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const filteredStudents = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      String(s.age).includes(q)
    );
  });

  const addStudent = useCallback(async (data) => {
    setLoading(true);
    await simulateLoading();
    setStudents((prev) => [...prev, { id: nextId++, ...data }]);
    setLoading(false);
  }, []);

  const updateStudent = useCallback(async (id, data) => {
    setLoading(true);
    await simulateLoading();
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    setLoading(false);
  }, []);

  const deleteStudent = useCallback(async (id) => {
    setLoading(true);
    await simulateLoading(400);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setLoading(false);
  }, []);

  return {
    students,
    filteredStudents,
    loading,
    search,
    setSearch,
    addStudent,
    updateStudent,
    deleteStudent,
  };
}
