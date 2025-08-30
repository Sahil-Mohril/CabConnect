package com.project.cabconnect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.project.cabconnect.cab.Cab;
import com.project.cabconnect.cab.CabService;
import com.project.cabconnect.driver.Driver;
import com.project.cabconnect.driver.DriverService;

import jakarta.annotation.PostConstruct;



@SpringBootApplication
public class CabconnectApplication {
	@Autowired
	CabService cabService;
	@Autowired
	DriverService driverService;
	public static void main(String[] args) {
		SpringApplication.run(CabconnectApplication.class, args);
		
	}
	@PostConstruct
	public void init()
	{
		Driver d1=new Driver("Sahil Mohril", 21, "UP2332NK32", "+91 8318552946");
		driverService.addDriver(d1);
		Driver d2=new Driver("Pranav Kumar", 22, "UP324H7700", "+91 991324242");
		driverService.addDriver(d2);

		cabService.addCab(new Cab("UP32NK5956","Swift Dezire",5,d1));
		cabService.addCab(new Cab("UP32ES0368","Hyundai i20",5,d2));
		//cabService.addCab(new Cab("UP32BH7879","Maruti WagonR",5,2123));
		//cabService.getByDriverId(1234);
		cabService.getCabById(302);
		cabService.getCabByVehicleNumber("UP32ES0368");
		
		
	}


}
