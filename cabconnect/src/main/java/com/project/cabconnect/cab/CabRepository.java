package com.project.cabconnect.cab;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CabRepository extends  JpaRepository<Cab, Integer> {

     @Query("SELECT c FROM Cab c WHERE c.driver.driverId = :driverId")
    Cab findByDriverId(int driverId);
    Optional<Cab>  findByVehicleNumber(String vehicleNumber);
    //Optional<Cab> findById(int cabid);
    @Query("select c from Cab c where c.cabId=?1")
    List<Cab> findById(int cabid);
    @Query("select c from Cab c where c.vehicleNumber=?1")
    Cab findByNumber(String VehicleNumber);
    
}
