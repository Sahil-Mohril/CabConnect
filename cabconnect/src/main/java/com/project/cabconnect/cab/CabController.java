package com.project.cabconnect.cab;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cabs")
public class CabController {
    @Autowired
    CabService cabService;
    @GetMapping("/all")
    public ResponseEntity<List<Cab>> getAllCabs()
    {
        return ResponseEntity.ok(cabService.getAllCabs());
    }
    @PostMapping
    public Cab addCab(@RequestBody Cab cab)
    {
        return cabService.addCab(cab);
    }
    // @GetMapping("/{id}")
    // public Optional<Cab> getCabById(@PathVariable int cabid)
    // {
    //     return cabService.getCabById(cabid);
    // }
    @GetMapping("/{id}")
    public ResponseEntity<List<Cab>> getCabById(@PathVariable int cabId)
    {
        return ResponseEntity.ok(cabService.getCabById(cabId));
    }
    @GetMapping("/num")
    public ResponseEntity<Cab> getCabByNumber()
    {
        return ResponseEntity.ok(cabService.getCabByVehicleNumber("UP32ES0368"));
    }
}
