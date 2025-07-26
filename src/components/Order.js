import React, { useState, useEffect, useRef } from 'react';
import AuthService from '../services/AuthService';

const Order = () => {
    const [bookings, setBookings] = useState([]);
    const [carDetails, setCarDetails] = useState({
        carNumber: '',
        carModel: '',
        owner: '',
        washPackage: '',
        location: '',
        date: '',
        status: ''
    });

    const myBtnRef = useRef({}); // Use a ref object to store button references

    useEffect(() => {
        // Fetch bookings when component mounts
        AuthService.viewOrders()
            .then((res) => {
                setBookings(res.data);
            })
            .catch((err) => {
                console.log(err);
                alert('Unable to load bookings');
            });
    }, []);

    // Handle booking details on accept
    const handleBooking = (id) => {
        AuthService.getBooking(id)
            .then((res) => {
                setCarDetails({
                    carNumber: res.data.carNumber,
                    carModel: res.data.carModel,
                    owner: res.data.owner,
                    washPackage: res.data.washPackage,
                    location: res.data.location,
                    date: res.data.date,
                    status: res.data.status
                });
            })
            .catch((err) => {
                console.log(err);
            });
        handleUpdateStatus(id);
    };

    // Handle status update of booking
    const handleUpdateStatus = (id) => {
        const user = AuthService.getCurrentUser();
        const washer = user.username;
        const booking = bookings.find((element) => element.bookingId === id);

        AuthService.updateBooking(
            id,
            booking.carNumber,
            booking.carModel,
            booking.owner,
            booking.washPackage,
            booking.location,
            booking.date,
            'Accepted By ' + washer
        )
            .then((res) => {
                console.log(res);
                // Update button class and text to show accepted status
                myBtnRef.current[id].className = 'btn btn-success';
                myBtnRef.current[id].innerHTML = 'Accepted';
            })
            .catch((err) => {
                console.log(err);
                alert('Error updating booking');
            });
    };

    // Handle deleting a booking
    const handleDeleteBooking = (id) => {
        AuthService.deleteBooking(id)
            .then((response) => {
                if (response.data != null) {
                    alert('Booking deleted successfully');
                    setBookings(bookings.filter((booking) => booking.bookingId !== id));
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Error deleting booking');
            });
    };

    return (
        <div className="container mb-4">
            <h1>Orders</h1>
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
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings &&
                                    bookings.map((booking) => (
                                        <tr key={booking.bookingId}>
                                            <td>{booking.bookingId}</td>
                                            <td>{booking.carNumber}</td>
                                            <td>{booking.carModel}</td>
                                            <td>{booking.owner}</td>
                                            <td>{booking.washPackage}</td>
                                            <td>{booking.location}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    ref={(ref) => (myBtnRef.current[booking.bookingId] = ref)}
                                                    onClick={() => handleUpdateStatus(booking.bookingId)}
                                                >
                                                    Accept
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeleteBooking(booking.bookingId)}
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
    );
};

export default Order;
