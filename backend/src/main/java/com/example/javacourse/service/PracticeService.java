package com.example.javacourse.service;

import com.example.javacourse.model.PracticeProblem;
import com.example.javacourse.model.ExpectedOutput;
import com.example.javacourse.repository.PracticeProblemRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class PracticeService {

    private final PracticeProblemRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${jdoodle.clientId}")
    private String clientId;

    @Value("${jdoodle.clientSecret}")
    private String clientSecret;

    public PracticeService(PracticeProblemRepository repository) {
        this.repository = repository;
    }

    public PracticeProblem save(PracticeProblem p) {
        return repository.save(p);
    }

    public java.util.List<PracticeProblem> list() {
        return repository.findAll();
    }

    public boolean evaluate(Long problemId, String userCode) {
        PracticeProblem problem = repository.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        // call JDoodle
        Map<String, Object> body = java.util.Map.of(
                "script", userCode,
                "language", "java",
                "versionIndex", "4",
                "stdin", "",
                "clientId", clientId,
                "clientSecret", clientSecret
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "https://api.jdoodle.com/v1/execute",
                new HttpEntity<>(body, headers),
                Map.class
        );

        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            String output = ((String) response.getBody().get("output")).trim();
            for (ExpectedOutput eo : problem.getOutputs()) {
                if (output.equals(eo.getOutput().trim())) {
                    return true;
                }
            }
        }
        return false;
    }
}
