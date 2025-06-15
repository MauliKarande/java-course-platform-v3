import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * StudentCourses
 * --------------
 * Fetches the list of courses from the backend
 *   GET /api/courses
 * and shows a Start button that links to /student/course/:courseId
 */
export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses once after component mounts
  useEffect(() => {
    // If you’ve set up a proxy in vite.config.js or package.json, `/api/courses` will hit Spring Boot directly.
    // Otherwise change to full URL like: fetch("http://localhost:8080/api/courses")
    fetch("http://localhost:8080/api/courses")

      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load courses:", err);
        setError("Could not load courses. Please try again later.");
        setLoading(false);
      });
  }, []);

  /* ─── Render ────────────────────────────────────────── */
  return (
    <div style={{ padding: "2rem" }}>
      <h2>📚 Available Courses</h2>

      {loading && <p>Loading courses…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && courses.length === 0 && (
        <p>No courses found.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {courses.map((course) => (
          <li
            key={course.id}
            style={{
              marginBottom: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <strong>{course.name}</strong>
            <br />
            {course.description && <em>{course.description}</em>}
            <br />
            <Link to={`/student/course/${course.id}`}>
              <button style={{ marginTop: "0.5rem" }}>Start</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
