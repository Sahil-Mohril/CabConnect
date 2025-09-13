package com.project.cabconnect.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User>  findByUserId(int userId);
    Optional<User>  findByEmailId(String emailId);
    boolean existsByEmailId(String emailId);
}
