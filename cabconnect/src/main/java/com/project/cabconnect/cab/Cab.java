package com.project.cabconnect.cab;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name="Cab",
       uniqueConstraints={@UniqueConstraint(
        name="vehicleNumber_unique",
        columnNames={"vehicleNumber"}
       )})
public class Cab {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private int cabId;
    @Column(name="vehicleNumber",
            nullable=false)
    private String vehicleNumber;
    private String model;
    private int seat;
    private int driverId;
    public Cab(){}
    public Cab(String vehicleNumber,String model,int seat,int driverId)
    {
        this.vehicleNumber=vehicleNumber;
        this.model=model;
        this.seat=seat;
        this.driverId=driverId;
    }
     public Integer getCabId() {
        return cabId;
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
    public int getDriverId()
    {
        return this.driverId;
    }
    // @Override
    // public String toString()
    // {
    // }


}
