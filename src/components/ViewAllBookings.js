import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class ViewAllBookings extends Component {
  constructor() {
    super();
    this.state = {
      bookings: []
    };
  }

  // Async function to fetch all bookings
  async componentDidMount() {
    try {
      const res = await AuthService.viewAllBookings();
      console.log(res);
      this.setState({
        bookings: res.data
      });
    } catch (err) {
      console.error(err);
      toast.error("Unable to load bookings");
    }
  }

  // Async function to handle the deletion of a booking
  handleDeleteBooking = async (id) => {
    try {
      const response = await AuthService.deleteBooking(id);
      if (response.data != null) {
        toast.success("Booking deleted successfully");
        this.setState({
          bookings: this.state.bookings.filter(booking => booking.bookingId !== id)
        });
      } else {
        toast.error("Error deleting the booking");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting the booking");
    }
  }

  render() {
    const { bookings } = this.state;

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
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length > 0 ? (
                      bookings.map(booking => (
                        <tr key={booking.bookingId}>
                          <td>{booking.bookingId}</td>
                          <td>{booking.carNumber}</td>
                          <td>{booking.carModel}</td>
                          <td>{booking.owner}</td>
                          <td>{booking.washPackage}</td>
                          <td>{booking.date}</td>
                          <td>{booking.status}</td>
                          <td>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => this.handleDeleteBooking(booking.bookingId)}>
                              <i className="fa fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">No bookings available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default ViewAllBookings;
