package com.example.javacourse.controller;

import com.example.javacourse.model.Course;
import com.example.javacourse.model.Lesson;
import com.example.javacourse.repository.CourseRepository;
import com.example.javacourse.repository.LessonRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CourseController {

    private final CourseRepository courseRepo;
    private final LessonRepository lessonRepo;

    public CourseController(CourseRepository courseRepo, LessonRepository lessonRepo) {
        this.courseRepo = courseRepo;
        this.lessonRepo = lessonRepo;
    }

    // ✅ Return all courses
    @GetMapping("/courses")
    public List<Course> allCourses() {
        return courseRepo.findAll();
    }

    // ✅ Return course name + its lessons
    @GetMapping("/courses/{id}/lessons")
    public Map<String, Object> getLessonsForCourse(@PathVariable Long id) {
        Course course = courseRepo.findById(id).orElseThrow();
      List<Lesson> lessons = lessonRepo.findByCourse_Id(id);

        return Map.of(
                "courseName", course.getName(),
                "lessons", lessons
        );
    }
}
