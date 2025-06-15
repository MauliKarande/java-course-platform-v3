import React from "react";
import { Link } from "react-router-dom";

export default function StudentCourses() {
  // Hard‑coded for demo – replace with fetch to your /api/courses
  const courses = [
    { id: 1, title: "Java Basics" },
    { id: 2, title: "OOP in Java" },
  ];

  return (
    <div>
      <h2>📚 Available Courses</h2>
      <ul>
        {courses.map((c) => (
          <li key={c.id}>
            {c.title} – <Link to="/student/practice">Start</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
