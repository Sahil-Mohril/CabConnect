package com.project.cabconnect.cab;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CabService {
    @Autowired
    CabRepository cabRepository;
    //ArrayList<Cab> allcab=new ArrayList<>();
    public Cab addCab(int cabId,String vehicleNumber,String model,int seat,int driverId)
    {
        Cab c1=new Cab(vehicleNumber, model, seat, driverId);
        //allcab.add(c1);
        return cabRepository.save(c1);
    }
    public List<Cab> getAllCab()
    {
        return cabRepository.findAll();
    }

}
