package com.project.cabconnect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.project.cabconnect.cab.Cab;
import com.project.cabconnect.cab.CabService;
import com.project.cabconnect.cab.CabStatus;
import com.project.cabconnect.driver.Driver;
import com.project.cabconnect.driver.DriverService;
import com.project.cabconnect.user.UserService;
import com.project.cabconnect.user.*;

import jakarta.annotation.PostConstruct;



@SpringBootApplication
public class CabconnectApplication {
	@Autowired
	CabService cabService;
	@Autowired
	DriverService driverService;
	@Autowired
	UserService userService;
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
		c1=cabService.addCab(c1);
		c2=cabService.addCab(c2);
		c3=cabService.addCab(c3);
		//cabService.addCab(new Cab("UP32BH7879","Maruti WagonR",5,2123));
		//cabService.getByDriverId(1234);
		cabService.getCabById(302);
		cabService.getCabByVehicleNumber("UP32ES0368");
		cabService.setStatus(c3, CabStatus.OFFLINE);
		// System.out.println("CAB ID"+c3.getCabId());
		cabService.setCabLocation(c3, 2.18, 7.90);
		cabService.setCabLocation(c2, 3.14, 8.99);
		cabService.setCabLocation(c1, 1.9, 2.44);
		
		User u1=new User("Prakrit Bahl","+9123244221","prakrit@gmail.com");
		User u2=new User("Saksham Mishra","+9189972013","sakshammishra@gmail.com");
		User u3=new User("MS Dhoni","+91778787787","dhoni7@gmail.com");
		userService.addUser(u1);
		userService.addUser(u2);
		userService.addUser(u3);
		
		
	}


}
