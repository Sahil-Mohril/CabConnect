package com.project.cabconnect.routing;

import com.project.cabconnect.booking.Booking;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name="Routing")
public class Routing {
   
    @EmbeddedId
    private RoutingId id;
    private double Lat;
    private double Lng;
    
    @ManyToOne
    @MapsId("bookingId")
    @JoinColumn(name="booking_id",referencedColumnName="bookingId")
    private Booking booking;

    public Routing(){}

    public Routing(Booking booking,int waypoint,double Lat,double Lng)
    {
        this.booking=booking;
        this.id=new RoutingId(booking.getBookingId(),waypoint);
        this.Lat=Lat;
        this.Lng=Lng;
    }
    public int getBookingId()
    {
        return this.booking.getBookindId();
    }
    public double getLatitude()
    {
        return this.Lat;
    }
    public double getLongitude()
    {
        return this.Lng;
    }
}


