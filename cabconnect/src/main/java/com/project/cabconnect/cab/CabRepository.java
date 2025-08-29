package com.project.cabconnect.cab;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CabRepository extends  JpaRepository<Cab, Integer> {
    
}
