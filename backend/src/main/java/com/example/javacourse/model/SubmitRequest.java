// src/main/java/com/example/javacourse/model/SubmitRequest.java
package com.example.javacourse.model;

public class SubmitRequest {
    private String code;
    private String expectedOutput;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }
}
