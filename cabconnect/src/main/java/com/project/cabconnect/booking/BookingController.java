package com.project.cabconnect.booking;

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
@RequestMapping("/booking")
public class BookingController {
    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    BookingService bookingService;
    String hello;
    BookingDTO bookingDTO;

    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings()
    {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
    @GetMapping("/{userid}/current")
    public ResponseEntity<Booking> getCurrentBooking(@PathVariable int userid)
    {
        return ResponseEntity.ok(bookingService.getCurrentBooking(userid));
    }
    // @PostMapping("/hello")
    // public String gethello()
    // {
    //     hello="hello";
    //     return "Hello";
    // }
    // @GetMapping("/hellno")
    // public ResponseEntity<String> gethellno()
    // {
    //     return ResponseEntity.ok(hello);
    // }
    @PostMapping("/DTO")
    public BookingDTO addBookingDTO(@RequestBody BookingDTO bookingDTO)
    {
        this.bookingDTO=bookingDTO;
        Booking booking=bookingService.addBooking(bookingDTO);
         return bookingDTO;
    }

    @GetMapping("/DTO/test")
    public ResponseEntity<BookingDTO>  getBookingDTO()
    {
        return ResponseEntity.ok(bookingDTO);
    }
}
