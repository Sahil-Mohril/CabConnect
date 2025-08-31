package com.project.cabconnect.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;
    public Booking addBooking(Booking booking)
    {
        return bookingRepository.save(booking);
    }
    
}
