package com.project.cabconnect.cab;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
public interface CabRepository extends  JpaRepository<Cab, Integer> {

     @Query("SELECT c FROM Cab c WHERE c.driver.driverId = :driverId")
    Cab findByDriverId(int driverId);

    Optional<Cab>  findByVehicleNumber(String vehicleNumber);
    //Optional<Cab findById(int cabid);

    @Query("select c from Cab c where c.cabId=?1")
    List<Cab> findById(int cabid);
    // @Query("select c from Cab c where c.cabId=?1")
    // Cab findCabById(int cabid);

    @Query("select c from Cab c where c.vehicleNumber=?1")
    Cab findByNumber(String VehicleNumber);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Transactional
    @Query(value="update cab set status=:cabStatus where cab_id=:cabId",
            nativeQuery=true)
     int updateCabStatus(@Param("cabId")int cabId,@Param("cabStatus")String cabStatus);
    

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Transactional
    @Query(value="update cab set cab_lat=:lat,cab_long=:lon where cab_id=:cabId",
    nativeQuery=true)    
    int updateCabLocation(@Param("cabId")int cabId,@Param("lat")double lat,@Param("lon")double lon);

    @Query("select c from Cab c where c.cabId=?1")
    Cab findCabById(int cabid);

    @Query(value="select * from cab c order by sqrt(power(c.cab_lat-:lat,2)+power(c.cab_long-:lng,2)) asc limit 1",nativeQuery=true)
    Cab findNearestCab(@Param("lat")double lat,@Param("lng")double lng);
    
}
