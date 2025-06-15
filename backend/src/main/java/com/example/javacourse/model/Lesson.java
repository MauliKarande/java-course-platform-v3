package com.example.javacourse.model;

import jakarta.persistence.*;

@Entity
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;   // or summary/content—keep your own fields

    /* NEW → link each lesson to one course */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")     // column in lesson table
    private Course course;

    /* getters & setters */

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}
