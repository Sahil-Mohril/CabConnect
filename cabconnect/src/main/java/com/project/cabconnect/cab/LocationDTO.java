package com.project.cabconnect.cab;

class LocationDTO {
    private double latitude;
    private double longitude;
    private int id;
    
    public LocationDTO(int id,double latitude,double longitude)
    {
        this.id=id;
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
    public int getId()
    {
        return this.id;
    }

    
}
