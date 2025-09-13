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

import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    // Constructor Injection (recommended)
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Save a new booking
    public Booking addBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get booking by ID
    public Booking getBookingById(int id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
    }

    // Delete booking by ID
    public void deleteBooking(int id) {
        bookingRepository.deleteById(id);
    }
}
