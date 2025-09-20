package com.project.cabconnect.booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
   @Query(value="select * from booking where user_id=:userid and booking_status='ON_GOING' limit 1",nativeQuery=true)
    public Booking getCurrentBooking(@Param("userid")int userid);

    @Transactional
    @Modifying
    @Query(value="update booking set booking_status=:status where user_id=:userid and booking_status='ON_GOING'",nativeQuery=true)
    public int updateBookingStatus(@Param("userid")int userid,@Param("status")String status);
    
}
