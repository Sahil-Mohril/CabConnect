package com.project.cabconnect.cab;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CabService {
    @Autowired
    CabRepository cabRepository;
    //ArrayList<Cab> allcab=new ArrayList<>();
    public Cab addCab(Cab cab)
    {
        return cabRepository.findByVehicleNumber(cab.getvehicleNumber()).orElseGet(()->cabRepository.save(cab));
    }
    public List<Cab> getAllCabs()
    {
        return cabRepository.findAll();
    }
    public Cab getByDriverId(int driverId)
    {
        return cabRepository.findByDriverId(driverId);
    }
    public List<Cab> getCabById(int cabId)
    {
        return cabRepository.findById(cabId);
    }
    public Cab getCabByVehicleNumber(String vehicleNumber)
    {
        return cabRepository.findByNumber(vehicleNumber);
    }

}
