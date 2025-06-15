// src/pages/student/CourseLessonsPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CourseLessonsPage = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    // fetch lessons
    fetch(`/api/lessons/by-course/${courseId}`)
      .then((res) => res.json())
      .then((data) => setLessons(data));

    // optionally: fetch course name
    fetch(`/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => setCourseName(data.name));
  }, [courseId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📘 Course: {courseName || "Loading..."}</h2>
      <hr />
      {lessons.length === 0 ? (
        <p>No lessons found for this course.</p>
      ) : (
        lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
            }}
          >
            <h4>{lesson.title}</h4>
            <p>{lesson.description}</p>
            <Link to={`/student/lesson/${lesson.id}`}>
              <button>Read</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseLessonsPage;
