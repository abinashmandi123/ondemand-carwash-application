import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    AuthService.viewBookings()
      .then((res) => {
        console.log(res);
        setBookings(res.data);
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 404) {
          setMessage("Sorry, there are no bookings for you.");
        } else {
          toast.error("Unable to load bookings");
        }
      });
  }, []);

  const handleDeleteBooking = (id) => {
    AuthService.deleteBooking(id).then((response) => {
      if (response.data != null) {
        toast.success("Booking deleted successfully");
        setBookings(bookings.filter((booking) => booking.bookingId !== id));
      }
    });
  };

  return (
    <div>
      <div className="container mb-4">
        <h1>Your Bookings</h1>
        {message && <p>{message}</p>}
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Booking Id</th>
                    <th scope="col">Car Number</th>
                    <th scope="col">Car Model</th>
                    <th scope="col">Package</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.bookingId}>
                      <td>{booking.bookingId}</td>
                      <td>{booking.carNumber}</td>
                      <td>{booking.carModel}</td>
                      <td>{booking.washPackage}</td>
                      <td>{new Date(booking.date).toLocaleString()}</td>
                      <td>{booking.status}</td>
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
              {!bookings.length && !message && (
                <p>No bookings found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Bookings;
