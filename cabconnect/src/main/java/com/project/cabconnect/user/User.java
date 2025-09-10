package com.project.cabconnect.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name="User",
        uniqueConstraints = {@UniqueConstraint(
            name="unique_email",
            columnNames = {"emailId"}
        )})
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private int userId;
    @Column(name="emailId",nullable=false)
    private String userMailId;
    @Column(name="password",nullable=false)
    private String userPassword="********";
    private String userName;
    private String userMobileNumber;
    private double userLat=0.0;
    private double userLong=0.0;
    
    public User(){}
    public User( String userName, String userMobileNumber, String userMailId) {
        this.userName = userName;
        this.userMobileNumber = userMobileNumber;
        this.userMailId = userMailId;
    }

    public int getuserId()
    {
        return this.userId;
    }
    public String getUserName()
    {
        return this.userName;
    }
    public String getEmailId()
    {
        return this.userMailId;
    }
    public String getUserMobileNumber()
    {
        return this.userMobileNumber;
    }
    public double getUserLat()
    {
        return this.userLat;
    }
    public double getUserLong()
    {
        return this.userLong;
    }
}
