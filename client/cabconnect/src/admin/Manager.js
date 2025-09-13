import React, { useEffect, useState } from "react";
import { getCabs } from "../services/CabController";
import "./style.css";
export default function Manager() {
    const [cabs, setcabs] = useState([
        {
            "cabId": 902,
            "vehicleNumber": "UP32NK5956",
            "model": "Swift Dezire",
            "seat": 5,
            "driver": {
                "driverId": 552,
                "driverName": "Sahil Mohril",
                "age": 21,
                "mobileNumber": "+91 8318552946",
                "licenceNumber": "UP2332NK32"
            },
            "cabStatus": "AVAILABLE"
        },
        {
            "cabId": 903,
            "vehicleNumber": "UP32ES0368",
            "model": "Hyundai i20",
            "seat": 5,
            "driver": {
                "driverId": 553,
                "driverName": "Pranav Kumar",
                "age": 22,
                "mobileNumber": "+91 991324242",
                "licenceNumber": "UP324H7700"
            },
            "cabStatus": "ON_TRIP"
        },
        {
            "cabId": 904,
            "vehicleNumber": "MP04AB4564",
            "model": "Toyota Innova",
            "seat": 7,
            "driver": {
                "driverId": 554,
                "driverName": "Siddhant Mohril",
                "age": 25,
                "mobileNumber": "+91 9912324224",
                "licenceNumber": "UP324ST2300"
            },
            "cabStatus": "OFFLINE"
        }
    ]);
    // const [newCab, setnewCab] = useState({})
    // useEffect(() => { fetchCabs() }, []);

    // const fetchCabs = async () => {
    //     const response = await getCabs();
    //     setcabs(response.data);
    // }
    return (<>
        <div className="cab-container">
            {cabs.map((cab) => (
                <li key={cab.cabId}>
                    {cab.vehicleNumber} - {cab.model}
                </li>
            ))}
        </div></>)
}

// import React, { useEffect, useState } from "react";
// import { getCabs } from "../services/CabController";

// export default function Manager() {
//     const [cabs, setCabs] = useState([]);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         fetchCabs();
//     }, []);

//     const fetchCabs = async () => {
//         try {
//             const response = await getCabs();
//             setCabs(response.data);
//         } catch (err) {
//             console.error("Error fetching cabs:", err);
//             setError("Failed to fetch cabs. Please check backend.");
//         }
//     };

//     return (
//         <div>
//             <h2>Cab List</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}

//             <ul>
//                 {cabs.map((cab) => (
//                     <li key={cab.cabId}>
//                         <strong>{cab.model}</strong> ({cab.vehicleNumber}) – Seats: {cab.seat} <br />
//                         Status: {cab.cabStatus} <br />
//                         Driver: {cab.driver.driverName} ({cab.driver.mobileNumber})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
