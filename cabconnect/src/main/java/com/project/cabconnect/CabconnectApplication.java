package com.project.cabconnect;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
		cabService.addCab(1,"UP32NK5965", "Swift Desize", 4, 1234);
		
	}


}
