package com.project.cabconnect.routing;

public class RoutingDTO {
    private int bookingId;
    private int waypoint;
    private double Lat;
    private double Lng;

    public RoutingDTO(int bookingId,int waypoint,double Lat,double Lng)
    {
        this.bookingId=bookingId;
        this.waypoint=waypoint;
        this.Lat=Lat;
        this.Lng=Lng;
    }

    public int getBookingId()
    {
        return bookingId;
    }
    public int getwaypoint()
    {
        return waypoint;
    }
    public double getLat()
    {
        return Lat;
    }
    public double getLng()
    {
        return Lng;
    }
}
