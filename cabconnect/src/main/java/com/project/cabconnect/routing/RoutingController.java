package com.project.cabconnect.routing;

import java.util.ArrayList;
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

import com.project.cabconnect.booking.Booking;
import com.project.cabconnect.booking.BookingRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/route")
public class RoutingController {
    @Autowired
    private RoutingRepository routingRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private RoutingService routingService;

    @PostMapping
    public List<Routing> getRoutes(@RequestBody List<RoutingDTO> routes)
    {
        List<Routing> routeList=new ArrayList<>();
        for(RoutingDTO dto:routes)
        {
            Booking booking = bookingRepository.findById(dto.getBookingId())
                             .orElseThrow(() -> new RuntimeException("booking gone man " + dto.getBookingId()));
            RoutingId id=new RoutingId(dto.getBookingId(), dto.getwaypoint());
            Routing route=new Routing();
            // Routing route=new Routing(, dto.getwaypoint(),dto.getLat(), dto.getLng());
            route.setId(id);
            route.setLat(dto.getLat());
            route.setLng(dto.getLng());
            route.setBooking(booking);
            routeList.add(route);
            //System.out.println(route);
        }
        //System.out.println(routeList);
        routingRepository.saveAll(routeList);
        return routeList;
    }

    @GetMapping("/{bookingId}/route")
    public ResponseEntity<List<Routing>> getRoutebyId(@PathVariable int bookingId)
    {
        return ResponseEntity.ok(routingService.getRouteById(bookingId));
    }
    
}
