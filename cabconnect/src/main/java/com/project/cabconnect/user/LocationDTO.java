 package com.project.cabconnect.user;

class LocationDTO {
    private double lat;
    private double lng;
    
    public LocationDTO(double lat,double lng)
    {
        this.lat=lat;
        this.lng=lng;
    }
    public double getLatitude()
    {
        return lat;
    }
    public void setLatitude(double lat)
    {
        this.lat=lat;
    }
    public double getLongitude()
    {
        return this.lng;
    }
    public void setLongitude(double lng)
    {
        this.lng=lng;
    }
    
}