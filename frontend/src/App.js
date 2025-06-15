import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import CourseLessonsPage from './pages/student/CourseLessonsPage'; // adjust path as per your project
import StudentCoursePage from "./pages/StudentCoursePage";


// Page components
import Home from './pages/Home';
import Admin from './pages/Admin';
import Student from './pages/Student';
import PracticePage from './pages/PracticePage';
import StudentRoutes from './StudentRoutes'; // ✅ FIXED: Correct path

function App() {
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const navigate = useNavigate();

  const chooseRole = (r) => {
    localStorage.setItem('role', r);
    setRole(r);
    if (r === 'ADMIN') navigate('/admin');
    else navigate('/student');
  };

  const logout = () => {
    localStorage.removeItem('role');
    setRole('');
    navigate('/');
  };

  return (
    <div className="container py-3">
      {/* Navigation Bar */}
      <nav className="d-flex justify-content-between mb-3">
        <div>
          <Link to="/" className="me-3">Home</Link>
          {role === 'ADMIN' && <Link to="/admin" className="me-3">Admin Panel</Link>}
          {role === 'STUDENT' && <Link to="/student" className="me-3">Courses</Link>}
        </div>
        {role && (
          <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home chooseRole={chooseRole} />} />
        <Route path="/admin/*" element={role === 'ADMIN' ? <Admin /> : <Navigate to="/" />} />
        <Route path="/student/*" element={role === 'STUDENT' ? <StudentRoutes /> : <Navigate to="/" />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/student/course/:courseId" element={<CourseLessonsPage />} />
        <Route path="/student/course/:id" element={<StudentCoursePage />} />


      </Routes>
    </div>
  );
}

export default App;
