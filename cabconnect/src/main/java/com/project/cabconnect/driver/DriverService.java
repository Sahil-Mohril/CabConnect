package com.project.cabconnect.driver;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverService {
    @Autowired
    DriverRepository driverRepository;
    public Driver addDriver(Driver driver)
    {
        return driverRepository.findByLicenseNumber(driver.getLicenceNumber()).orElseGet(()->driverRepository.save(driver));
    }
    public List<Driver> getAllDrivers()
    {
        return driverRepository.findAll();
    }
}
