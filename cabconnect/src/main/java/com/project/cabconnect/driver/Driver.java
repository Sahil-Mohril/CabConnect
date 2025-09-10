package com.project.cabconnect.driver;

import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Configuration
@EnableTransactionManagement
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
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition="varchar(100)")
    private Rating rating=Rating.FOUR_STAR;

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
