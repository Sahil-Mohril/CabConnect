package com.project.cabconnect.booking;
import java.time.LocalDateTime;

public class BookingDTO {
    private int userId;
    private double startLat;
    private double startLong;
    private double endLat;
    private double endLong;
    private LocalDateTime startTime;

    public BookingDTO(){}
    public BookingDTO(int userId,double startLat,double startLong,double endLat,double endLong,LocalDateTime starTime)
    {
        this.userId=userId;
        this.startLat=startLat;
        this.startLong=startLong;
        this.endLat=endLat;
        this.endLong=endLong;
        this.startTime=startTime;
    }
    public int getUserId()
    {
        return this.userId;
    }
    public double getStartLong()
    {
        return this.startLong;
    }
    public double getStartLat()
    {
        return this.startLat;
    }
    public double getEndLat()
    {
        return this.endLat;
    }
    public double getEndLong()
    {
        return this.endLong;
    }
    public LocalDateTime getStartTime()
    {
        return this.startTime;
    }
    public void setStartLat(double startLat)
    {
        this.startLat=startLat;
    }
    public void setStartLong(double startLong)
    {
        this.startLong=startLong;
    }
    public void setEndLong(double endLong)
    {
        this.endLong=endLong;
    }
    public void setEndLat(double endLat)
    {
        this.endLat=endLat;
    }
    public void setStartTime(LocalDateTime startTime)
    {
        this.startTime=startTime;
    }
}
