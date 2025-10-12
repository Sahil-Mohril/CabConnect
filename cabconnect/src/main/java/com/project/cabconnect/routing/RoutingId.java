package com.project.cabconnect.routing;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public class RoutingId implements Serializable {
    private int bookingId;
    private int waypoint;

    public RoutingId(){}
    public RoutingId(int bookingId,int waypoint)
    {
        this.bookingId=bookingId;
        this.waypoint=waypoint;
    }

    @Override
    public boolean equals(Object o)
    {  
        if(this==o) return true;
        if(!(o instanceof RoutingId)) return false;
        RoutingId that=(RoutingId) o;
        return waypoint== that.waypoint && (bookingId==that.bookingId);
    }

    @Override
    public int hashCode()
    {
        return java.util.Objects.hash(bookingId,waypoint);
    }
    
}
