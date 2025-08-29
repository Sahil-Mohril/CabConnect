package com.project.cabconnect.cab;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CabRepository extends  JpaRepository<Cab, Integer> {
    Cab findByDriverId(int driverId);
    Optional<Cab>  findByVehicleNumber(String vehicleNumber);
    Optional<Cab> findById(int cabid);
    
    
}
