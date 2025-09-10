// package com.project.cabconnect.cab;

// import java.time.LocalDateTime;

// import jakarta.persistence.Entity;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToOne;

// @Entity
// public class CabLocation extends Cab{
//     @Id
//     @OneToOne
//     @JoinColumn(
//         name="cabId",
//         referencedColumnName="cabId"
//     )
//     private Cab cab;
//     private LocalDateTime timestamp;
//     private double cabLat;
//     private double cabLong;

//     public CabLocation(){

//     }
//     public void setCabLocation(double lat,double lon)
//     {
//         this.cabLong=lon;
//         this.cabLat=lat;
//     }
// }
