package com.example.javacourse.controller;

import com.example.javacourse.model.Lesson;
import com.example.javacourse.repository.LessonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin(origins = "*")   // allow calls from any frontend origin; adjust as needed
public class LessonController {

    private final LessonRepository repo;

    public LessonController(LessonRepository repo) {
        this.repo = repo;
    }

    /** ─────────────────────────────────────────────────────────
     *  GET /api/lessons               → all lessons (admin use)
     *  ───────────────────────────────────────────────────────── */
    @GetMapping
    public List<Lesson> all() {
        return repo.findAll();
    }

    /** ─────────────────────────────────────────────────────────
     *  POST /api/lessons              → create a lesson
     *  ───────────────────────────────────────────────────────── */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Lesson create(@RequestBody Lesson lesson) {
        return repo.save(lesson);
    }

    /** ─────────────────────────────────────────────────────────
     *  GET /api/lessons/{id}          → one lesson by ID
     *  ───────────────────────────────────────────────────────── */
    @GetMapping("/{id}")
    public Lesson one(@PathVariable Long id) {
        return repo.findById(id)
                   .orElseThrow(() -> new ResponseStatusException(
                       HttpStatus.NOT_FOUND, "Lesson not found: " + id));
    }

    /** ─────────────────────────────────────────────────────────
     *  NEW: GET /api/lessons/by-course/{courseId}
     *  Returns all lessons that belong to a specific course.
     *  ───────────────────────────────────────────────────────── */
    @GetMapping("/by-course/{courseId}")
    public List<Lesson> byCourse(@PathVariable Long courseId) {
        return repo.findByCourse_Id(courseId);
    }
}
