package com.project.cabconnect.cab;

import java.time.LocalDateTime;

import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.project.cabconnect.driver.Driver;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
@Entity
@Table(name="Cab",
       uniqueConstraints={@UniqueConstraint(
        name="vehicleNumber_unique",
        columnNames={"vehicleNumber"}
       )})
@Configuration
@EnableTransactionManagement
public class Cab {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private int cabId;
    @Column(name="vehicleNumber",
            nullable=false)
    private String vehicleNumber;
    private String model;
    private int seat;
    @OneToOne
    @JoinColumn(
        name="driverId",
        referencedColumnName="driverId"
    )
    private Driver driver;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition="varchar(100)",nullable=false)
    private CabStatus status=CabStatus.AVAILABLE;

    private LocalDateTime timestamp=LocalDateTime.now();
    private double cabLat;
    private double cabLong;
    public Cab(){}
    public Cab(String vehicleNumber,String model,int seat,Driver driver)
    {
        this.vehicleNumber=vehicleNumber;
        this.model=model;
        this.seat=seat;
        // this.driverId=driverId;
        this.driver=driver;
    }
    public Cab(String vehicleNumber,String model,int seat,Driver driver,CabStatus cabStatus)
    {
        this.vehicleNumber=vehicleNumber;
        this.model=model;
        this.seat=seat;
        // this.driverId=driverId;
        this.driver=driver;
        this.status=cabStatus;
    }
     public int getCabId() {
        return this.cabId;
    }

    public void setCabId(Integer cabId) {
        this.cabId = cabId;
    }
    public String  getvehicleNumber()
    {
        return this.vehicleNumber;
    }
    public String getModel()
    {
        return this.model;
    }
    public int getSeat()
    {
        return this.seat;
    }
    public Driver getDriver()
    {
        return this.driver;
    }
    public CabStatus getCabStatus()
    {
        return this.status;
    }
    public void setCabStatus(CabStatus status)
    {
        this.status=status;
    }
    public double getLatitude()
    {
        return this.cabLat;
    }
    public double getLongitude()
    {
        return this.cabLong;
    }
    // public void setCabLocation(double lat,double lon)
    // {
    //     this.tm
    //     this.cabLat=lat;
    //     this.cabLong=lon;
    // } 
    // public int getDriverId()
    // {
    //     return this.driverId;
    // }
    // @Override
    // public String toString()
    // {
    // }


}
