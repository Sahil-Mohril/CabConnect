package com.project.cabconnect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.project.cabconnect.cab.Cab;
import com.project.cabconnect.cab.CabService;
import com.project.cabconnect.cab.CabStatus;
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
		Driver d3=new Driver("Siddhant Mohril", 25, "UP324ST2300", "+91 9912324224");
		driverService.addDriver(d3);

		Cab c1=new Cab("UP32NK5956","Swift Dezire",5,d1);
		Cab c2=new Cab("UP32ES0368","Hyundai i20",5,d2);
		Cab c3=new Cab("MP04AB4564","Toyota Innova",7,d3,CabStatus.BOOKED);
		cabService.addCab(c1);
		cabService.addCab(c2);
		cabService.addCab(c3);
		//cabService.addCab(new Cab("UP32BH7879","Maruti WagonR",5,2123));
		//cabService.getByDriverId(1234);
		cabService.getCabById(302);
		cabService.getCabByVehicleNumber("UP32ES0368");
		//cabService.setCabStatus(c2, CabStatus.ON_TRIP);
		
		
	}


}
