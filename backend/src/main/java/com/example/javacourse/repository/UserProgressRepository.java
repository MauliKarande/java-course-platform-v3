package com.example.javacourse.repository;

import com.example.javacourse.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
}
