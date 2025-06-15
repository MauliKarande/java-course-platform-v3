package com.example.javacourse.controller;

import com.example.javacourse.model.Lesson;
import com.example.javacourse.repository.LessonRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private final LessonRepository repo;

    public LessonController(LessonRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Lesson> all() {
        return repo.findAll();
    }

    @PostMapping
    public Lesson create(@RequestBody Lesson lesson) {
        return repo.save(lesson);
    }

    @GetMapping("/{id}")
    public Lesson one(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }
}
