// package com.project.cabconnect.booking;



// @Service
// public class BookingService {
//     @Autowired
//     BookingRepository bookingRepository;
//     @Autowired
//     CabRepository cabRepository;
//     public Booking addBooking(Booking booking)
//     {
//         return bookingRepository.save(booking);
//     }
//     // public Cab getNearestCab(User user)
//     // {
        
//     // }

// }

package com.project.cabconnect.booking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.cabconnect.cab.CabService;

@Service
public class BookingService {
    @Autowired
     BookingRepository bookingRepository;
     @Autowired
     CabService cabService;

    public Booking addBooking(Booking booking) {
        double  userLat=booking.getUser().getUserLat();
        double userLong=booking.getUser().getUserLong();
        booking.setCab(cabService.getNearestCab(booking.getStartLat(),booking.getStartLong()));
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(int id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
    }

    public void deleteBooking(int id) {
        bookingRepository.deleteById(id);
    }
}
