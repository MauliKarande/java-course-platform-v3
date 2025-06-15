package com.example.javacourse.repository;

import com.example.javacourse.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    // uses nested property: course.id  →  course_Id (underscore)
    List<Lesson> findByCourse_Id(Long courseId);
}
