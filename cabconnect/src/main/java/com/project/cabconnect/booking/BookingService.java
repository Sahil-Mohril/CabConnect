package com.project.cabconnect.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.cabconnect.cab.CabRepository;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;
    @Autowired
    CabRepository cabRepository;
    public Booking addBooking(Booking booking)
    {
        return bookingRepository.save(booking);
    }
    // public Cab getNearestCab(User user)
    // {
        
    // }

}
