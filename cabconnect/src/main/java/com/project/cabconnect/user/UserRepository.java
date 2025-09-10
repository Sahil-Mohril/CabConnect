package com.project.cabconnect.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User>  findByUserId(int userId);
    Optional<User>  findByUserMailId(String emailId);
}
