import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const ViewAllScheduledBookings = () => {
    const [bookings, setBookings] = useState([]);

    // Fetch scheduled bookings on component mount
    useEffect(() => {
        AuthService.viewAllScheduledBookings()
            .then((res) => {
                console.log(res);
                setBookings(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert("Unable to load bookings");
            });
    }, []);

    // Handle deletion of booking
    const handleDeleteBooking = (id) => {
        AuthService.deleteBooking(id)
            .then((response) => {
                if (response.data != null) {
                    alert("Booking deleted successfully");
                    setBookings(bookings.filter((booking) => booking.id !== id));
                }
            })
            .catch(() => {
                alert("Unable to delete booking");
            });
    };

    return (
        <div>
            <div className="container mb-4">
                <h1>Bookings</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Booking Id</th>
                                        <th scope="col">Car Number</th>
                                        <th scope="col">Car Model</th>
                                        <th scope="col">Owner</th>
                                        <th scope="col">Package</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Status</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings && bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>
                                            <td>{booking.carNumber}</td>
                                            <td>{booking.carModel}</td>
                                            <td>{booking.owner}</td>
                                            <td>{booking.washPackage}</td>
                                            <td>{booking.location}</td>
                                            <td>{booking.date}</td>
                                            <td>{booking.time}</td>
                                            <td>{booking.status}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeleteBooking(booking.id)}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAllScheduledBookings;
