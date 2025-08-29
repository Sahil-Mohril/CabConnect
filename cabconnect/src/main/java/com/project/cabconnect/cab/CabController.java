package com.project.cabconnect.cab;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class CabController {
    @Autowired
    CabService cabService;
    @GetMapping("/all")
    public ResponseEntity<List<Cab>> getAllCabs()
    {
        return ResponseEntity.ok(cabService.getAllCab());
    }
}
