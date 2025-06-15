import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

/**
 * StudentCoursePage
 * -----------------
 * When student clicks on a course, this shows all lessons of that course.
 */
export default function StudentCoursePage() {
  const { id } = useParams(); // courseId from URL
  const [lessons, setLessons] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch lessons for the course
    fetch(`/api/courses/${id}/lessons`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setLessons(data.lessons);
        setCourseName(data.courseName);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load lessons:", err);
        setError("Could not load lessons.");
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📘 {courseName}</h2>
      {loading && <p>Loading lessons…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          style={{
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "1rem",
          }}
        >
          <strong>{lesson.title}</strong>
          <p>{lesson.summary}</p>
          <Link to={`/student/lesson/${lesson.id}`}>
            <button>Read</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
