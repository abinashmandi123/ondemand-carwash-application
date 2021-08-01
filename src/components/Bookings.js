import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import AuthService from '../services/AuthService';

export class Bookings extends Component {
    constructor(){
        super();
        this.state={
            bookings:[]
        }
    }
    componentDidMount(){
        AuthService.viewBookings().then((res)=>{
            console.log(res);
            this.setState({
                bookings:res.data
            })
        }).catch((err)=>{
            console.log(err);
            alert("unable to load bookings");
        })
    }
    handleDeleteBooking(id){
        AuthService.deleteBooking(id).then(response=>{
            if(response.data!=null){
                alert("Booking deleted successfully");
                this.setState({
                    bookings:this.state.bookings.filter(booking=>booking.bookingId!==id)
                })
            }
        });
    }
    render() {
        const bookings=this.state.bookings;
        return (
            <div>
                <div className="conainer mb-4">
                <h1>Your Bookings</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="table-reponsive">
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
                                        {bookings && bookings.map(booking=>
                                        <tr key={booking.bookingId}>
                                        
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.carNumber}</td>
                                        <td>{booking.carModel}</td>
                                        <td>{booking.washPackage}</td>
                                        <td>{booking.date.toLocaleString()}</td>
                                        <td>{booking.status}</td>
                                        <td></td>
                            
                                        
                                        <td><button className="btn btn-sm btn-danger" onClick={this.handleDeleteBooking.bind(this,booking.bookingId)}><i className="fa fa-trash"></i></button></td>
                                    </tr>
                                            )}
                                        
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Bookings
