package com.project.cabconnect.cab;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

    @Component
public class CabSimulator {
    @Autowired
    private CabService cabService;

    @PostConstruct
    public void startSimulation() {
    for (int i = 1; i <= 5; i++) {
            new Thread(() -> {
                Random random = new Random();
                try {
                while (true) {
                double lat = 28.60+random.nextDouble() * 0.1;
                        double lon = 77.20+random.nextDouble() * 0.1;
                        cabService.setCabLocation(cabService.getCabById(503), lat, lon);
                        // System.out.println("Cab "+cabService.getCabById(503)+" moved to("+lat+",""+ lon + ")");
                        Thread.sleep(2000);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }


}
