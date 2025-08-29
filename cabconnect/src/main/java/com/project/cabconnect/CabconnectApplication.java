package com.project.cabconnect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.project.cabconnect.cab.Cab;
import com.project.cabconnect.cab.CabService;

import jakarta.annotation.PostConstruct;



@SpringBootApplication
public class CabconnectApplication {
	@Autowired
	CabService cabService;
	public static void main(String[] args) {
		SpringApplication.run(CabconnectApplication.class, args);
		
	}
	@PostConstruct
	public void init()
	{
		cabService.addCab(new Cab("UP32NK5956","Swift Dezire",5,1234));
		cabService.addCab(new Cab("UP32ES0368","Hyundai i20",5,321));
		cabService.addCab(new Cab("UP32BH7879","Maruti WagonR",5,2123));
		//cabService.getByDriverId(1234);
	}


}
