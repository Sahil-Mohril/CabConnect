package com.project.cabconnect.cab;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
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
    // @GetMapping("/{cabId}")
    // public ResponseEntity<List<Cab>> getCabById(@PathVariable int cabId)
    // {
    //     return ResponseEntity.ok(cabService.getCabById(cabId));
    // }
    @GetMapping("/num")
    public ResponseEntity<Cab> getCabByNumber()
    {
        return ResponseEntity.ok(cabService.getCabByVehicleNumber("UP32ES0368"));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Cab> getCabById(@PathVariable int id)
    {
        return ResponseEntity.ok(cabService.getCabById(id));

    }
}
