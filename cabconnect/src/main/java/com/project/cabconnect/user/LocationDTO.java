 package com.project.cabconnect.user;

class LocationDTO {
    private double latitude;
    private double longitude;
    
    public LocationDTO(double latitude,double longitude)
    {
        this.latitude=latitude;
        this.longitude=longitude;
    }
    public double getLatitude()
    {
        return latitude;
    }
    public void setLatitude(double latitude)
    {
        this.latitude=latitude;
    }
    public double getLongitude()
    {
        return this.longitude;
    }
    public void setLongitude(double longitude)
    {
        this.longitude=longitude;
    }
    
}