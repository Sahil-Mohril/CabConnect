package com.project.cabconnect.booking;

import java.time.LocalDateTime;

import com.project.cabconnect.cab.Cab;
import com.project.cabconnect.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name="Booking",uniqueConstraints={@UniqueConstraint(name="uniquebooking",columnNames={"bookingId"})})
public class Booking {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private int bookingId;
    @ManyToOne
    @JoinColumn(
        name="userId",
        referencedColumnName="userId"
    )
    private User user;
    @ManyToOne
    @JoinColumn(
        name="cabId",
        referencedColumnName="cabId"
    )
    private Cab cab;
    private double startLat;
    private double startLong;
    private double endLat;
    private double endLong;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition="varchar(20)")
    private BookingStatus bookingStatus;

    public Booking(){}
    public Booking(User user,double startLat,double startLong,double endLat,double endLong,LocalDateTime startTime, LocalDateTime endTime)
    {
        this.user=user;
        this.startLat=startLat;
        this.startLong=startLong;
        this.endLat=endLat;
        this.endLong=endLong;
        this.startTime=startTime;
        this.endTime=endTime;
        //this.cab=BookingService.getNearestCab(user);
    }
    public int getBookingId()
    {
        return this.bookingId;
    }
    public User getUser()
    {
        return this.user;
    }
    public Cab getCab()
    {
        return this.cab;
    }
    public int getBookindId()
    {
        return this.bookingId;
    }
    public void setCab(Cab cab)
    {
        this.cab=cab;
    }
    public void setStatus(BookingStatus bookingStatus)
    {
        this.bookingStatus=bookingStatus;
    }
    public double getStartLat()
    {
        return this.startLat;
    }
    public double getStartLong()
    {
        return this.startLong;
    }

}
