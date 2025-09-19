package com.project.cabconnect.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;


public interface UserRepository extends JpaRepository<User, Integer> {
    User  findByUserId(int userId);
    Optional<User>  findByEmailId(String emailId);
    boolean existsByEmailId(String emailId);
    
    @Modifying
    @Transactional
    @Query(value="update user set user_lat=:lat, user_long=:lng where user_id=:id", nativeQuery=true)
    int updateUserLocation(@Param("id") int id ,@Param("lat") double lat,@Param("lng") double lng);
}
