import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentCourses from "./pages/StudentCourses"; // shows list
import Student from "./pages/Student";               // IDE page

export default function StudentRoutes() {
  return (
    <Routes>
      {/* /student */}
      <Route index element={<StudentCourses />} />

      {/* /student/practice */}
      <Route path="practice" element={<Student />} />
    </Routes>
  );
}
