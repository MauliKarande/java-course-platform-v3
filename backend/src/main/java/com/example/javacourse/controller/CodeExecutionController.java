package com.example.javacourse.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/code")
public class CodeExecutionController {

    /* ───────────────────────────── helpers ───────────────────────────── */

    /** Extracts the first `public class Xxx` name from code. */
    private String extractClassName(String code) {
        Pattern p = Pattern.compile("public\\s+class\\s+(\\w+)");
        Matcher m = p.matcher(code);
        return m.find() ? m.group(1) : null;
    }

    /** Compile `javac` and return any compiler output; return null on success. */
    private String compileJava(String className, Path dir) throws Exception {
        Process compile = new ProcessBuilder("javac", className + ".java")
                .directory(dir.toFile())
                .redirectErrorStream(true)
                .start();
        compile.waitFor();

        if (compile.exitValue() != 0) {
            return new String(compile.getInputStream().readAllBytes());
        }
        return null; // success
    }

    /** Run `java Xxx` and capture output (std+err merged). */
    private String runJava(String className, Path dir) throws Exception {
        Process run = new ProcessBuilder("java", className)
                .directory(dir.toFile())
                .redirectErrorStream(true)
                .start();
        run.waitFor();
        return new String(run.getInputStream().readAllBytes());
    }

    /* ───────────────────────────── DTOs ───────────────────────────── */

    public record CodeRequest(String code, String language) { }
    public record SubmitRequest(String code, String language, String expected) { }
    public record Output(String output) { }
    public record SubmitResult(boolean correct, String actual, String expected) { }

    /* ───────────────────────────── /run ───────────────────────────── */

    @PostMapping("/run")
    public ResponseEntity<Output> run(@RequestBody CodeRequest req) {
        try {
            String className = extractClassName(req.code());
            if (className == null) {
                return ResponseEntity.badRequest()
                        .body(new Output("Error: No `public class` found"));
            }

            Path tmp = Files.createTempDirectory("javacode");
            Files.writeString(tmp.resolve(className + ".java"), req.code());

            String compileErr = compileJava(className, tmp);
            if (compileErr != null) {
                return ResponseEntity.ok(new Output("Compilation Error:\n" + compileErr));
            }

            String out = runJava(className, tmp);
            return ResponseEntity.ok(new Output(out.trim()));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new Output("Error: " + e.getMessage()));
        }
    }

    /* ───────────────────────────── /submit ───────────────────────────── */

    @PostMapping("/submit")
    public ResponseEntity<SubmitResult> submit(@RequestBody SubmitRequest req) {
        try {
            String className = extractClassName(req.code());
            if (className == null) {
                return ResponseEntity.ok(new SubmitResult(false,
                        "No `public class` found", req.expected()));
            }

            Path tmp = Files.createTempDirectory("javacode");
            Files.writeString(tmp.resolve(className + ".java"), req.code());

            String compileErr = compileJava(className, tmp);
            if (compileErr != null) {
                return ResponseEntity.ok(new SubmitResult(false,
                        "Compilation Error:\n" + compileErr, req.expected()));
            }

            String actual = runJava(className, tmp).trim();
            boolean ok = actual.equals(req.expected().trim());

            return ResponseEntity.ok(new SubmitResult(ok, actual, req.expected()));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new SubmitResult(false, "Error: " + e.getMessage(), req.expected()));
        }
    }
}
