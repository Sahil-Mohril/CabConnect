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
    private String userPassword;
    private String userName;
    private String userMobileNumber;
    

    public User(int userId, String userName, String userMobileNumber, String userMailId) {
        this.userId = userId;
        this.userName = userName;
        this.userMobileNumber = userMobileNumber;
        this.userMailId = userMailId;
    }

    public int getuserId()
    {
        return this.userId;
    }
}
