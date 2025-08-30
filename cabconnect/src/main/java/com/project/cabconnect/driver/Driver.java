package com.project.cabconnect.driver;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name="Driver",
        uniqueConstraints = {@UniqueConstraint(
            name="unique_licence",
            columnNames = {"licenseNumber"}
        )})
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "driverId")
    private int driverId;
    @Column(nullable=false)
    private String driverName;
    private int age;
    private String licenseNumber;
    @Column(nullable = false)
    private String mobileNumber;
    private Rating rating;

    public Driver() {}
    public Driver(String driverName,int age,String licenseNumber,String mobileNumber)
    {
        this.driverName=driverName;
        this.age=age;
        this.licenseNumber=licenseNumber;
        this.mobileNumber=mobileNumber;
    }
    public int getDriverId()
    {
        return this.driverId;
    }
    public String getDriverName()
    {
        return this.driverName;
    }
    public int getAge()
    {
        return this.age;
    }
    public String getLicenceNumber()
    {
        return this.licenseNumber;
    }
    public String getMobileNumber()
    {
        return this.mobileNumber;
    }
    
}
