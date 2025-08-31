package com.project.cabconnect.driver;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface DriverRepository extends JpaRepository<Driver,Integer >{
    Optional<Driver>  findByDriverId(int driverId);

    Optional<Driver>  findByLicenseNumber(String liscenceNumber);
}
