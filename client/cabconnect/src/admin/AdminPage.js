import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCabs, getDrivers, addCab } from "../services/CabController";
import "./AdminPage.css";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("bookings");
    const [cabs, setCabs] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [newCab, setNewCab] = useState({ "VehicleNumber": "", "model": "", "seats": 0, "driver": { "driverId": 0 } })
    useEffect(() => {
        fetchCabs();
        fetchDrivers();
    }, []);

    const fetchCabs = async () => {
        const response = await getCabs();
        setCabs(response.data);
    }
    const fetchDrivers = async () => {
        const response = await getDrivers();
        setDrivers(response.data);
    }
    const handleAddCab = async (cab) => {
        await addCab(cab);

    }

    return (
        <div className="admin-container">
            { }
            <aside className="sidebar">
                <h2 className="logo">CabConnect</h2>
                <ul>
                    <li onClick={() => setActiveTab("bookings")} className={activeTab === "bookings" ? "active" : ""}>Booking Logs</li>
                    <li onClick={() => setActiveTab("cabs")} className={activeTab === "cabs" ? "active" : ""}>Cabs</li>
                    <li onClick={() => setActiveTab("drivers")} className={activeTab === "drivers" ? "active" : ""}>Drivers</li>
                    <li onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>Users</li>
                </ul>
            </aside>

            { }
            <main className="content">
                {activeTab === "bookings" && (
                    <div className="card">

                    </div>
                )}
                {/* {activeTab === "cabs" && (
                    <div className="card">
                        <h3>Cabs</h3>
                        {cabs.map((cab) => (
                            <li key={cab.cabId}>
                                {cab.vehicleNumber} - {cab.model}
                            </li>
                        ))}
                    </div>
                )} */}
                {activeTab === "cabs" && (
                    <><div className="card">
                        <h3>Cabs</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Cab ID</th>
                                    <th>Vehicle Number</th>
                                    <th>Model</th>
                                    <th>Seats</th>
                                    <th>Driver Id</th>
                                    <th>Driver Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cabs.map((cab) => (
                                    <tr key={cab.cabId}>
                                        <td>{cab.cabId}</td>
                                        <td>{cab.vehicleNumber}</td>
                                        <td>{cab.model}</td>
                                        <td>{cab.seat}</td>
                                        <td>{cab.driver.driverId}</td>
                                        <td>{cab.driver.driverName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                        <div className="add-card">
                            <label htmlFor="vehicleNumber"><h3>Vehicle Number</h3></label><br />
                            <input type="text" id="vehicleNumber" value={newCab.vehicleNumber} onChange={(e) => setNewCab({ ...newCab, vehicleNumber: e.target.value })} />
                            <label htmlFor="model"><h3>Model</h3></label><br />
                            <input type="text" id="model" value={newCab.model} onChange={(e) => setNewCab({ ...newCab, model: e.target.value })} />
                            <label htmlFor="seats"><h3>Seats</h3></label><br />
                            <input type="text" id="seats" value={newCab.seats} onChange={(e) => setNewCab({ ...newCab, seats: e.target.value })} />
                            <label htmlFor="DriverId"><h3>Driver Id</h3></label><br />
                            <input type="text" id="driverId" value={newCab.driverId} onChange={(e) => setNewCab({ ...newCab, driverId: e.target.value })} />
                            <div className="add-button" onClick={() => handleAddCab(newCab)}>Add Cab</div>
                        </div>

                    </>
                )}
                {activeTab === "drivers" && (
                    <div className="card">
                        <h3>Drivers</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Driver Id</th>
                                    <th>Driver Name</th>
                                    <th>Age</th>
                                    <th>Mobile Number</th>
                                    <th>Licence Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drivers.map((driver) => (
                                    <tr key={driver.driverId}>
                                        <td>{driver.driverId}</td>
                                        <td>{driver.driverName}</td>
                                        <td>{driver.age}</td>
                                        <td>{driver.mobileNumber}</td>
                                        <td>{driver.licenceNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "users" && (
                    <div className="card">

                    </div>
                )}
            </main>
        </div>
    );
}
