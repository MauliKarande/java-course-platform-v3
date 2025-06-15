package com.example.javacourse.controller;

import com.example.javacourse.model.PracticeProblem;
import com.example.javacourse.repository.PracticeProblemRepository;
import com.example.javacourse.service.PracticeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/problems")
public class PracticeProblemController {

    private final PracticeProblemRepository repo;
    private final PracticeService service;

    public PracticeProblemController(PracticeProblemRepository repo, PracticeService service) {
        this.repo = repo;
        this.service = service;
    }

    @GetMapping
    public List<PracticeProblem> all() {
        return repo.findAll();
    }

    @PostMapping
    public PracticeProblem create(@RequestBody PracticeProblem problem) {
        return repo.save(problem);
    }

    record EvaluateRequest(String code) {}
    @PostMapping("/{id}/evaluate")
    public ResponseEntity<Map<String, Object>> eval(@PathVariable Long id, @RequestBody EvaluateRequest req) {
        boolean correct = service.evaluate(id, req.code());
        return ResponseEntity.ok(Map.of("correct", correct));
    }
}
