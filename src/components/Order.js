import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import AuthService from '../services/AuthService'

export class Order extends Component {
    constructor(props){
        super(props);
        this.myBtnRef=[];
        this.handleUpdateStatus=this.handleUpdateStatus.bind(this);
        this.handleBooking=this.handleBooking.bind(this);
        this.state={
            bookings:[]
        }
    }
    componentDidMount(){
        AuthService.viewOrders().then((res)=>{
            console.log(res);
            this.setState({
                bookings:res.data
            })
        }).catch((err)=>{
            console.log(err);
            alert("unable to load bookings");
        });

    }
    // componentDidUpdate(){

    // }
    handleBooking(id){
         AuthService.getBooking(id).then((res)=>{
            console.log(res);
            this.setState({
                carNumber:res.data.carNumber,
                carModel:res.data.carModel,
                owner:res.data.owner,
                washPackage:res.data.washPackage,
                location:res.data.location,
                date:res.data.date,
                status:res.data.status
            })
        }).catch((err)=>{
            console.log(err);
        })
        this.handleUpdateStatus(id);
    }
    handleUpdateStatus(id){
        const bookings=this.state.bookings;
        let booking=[];
        Object.values(bookings).forEach(element => {
            if(element.bookingId==id){
                booking=element;
            }
        });
        console.log(booking);
        AuthService.updateBooking(
            id,
            booking.carNumber,
            booking.carModel,
            booking.owner,
            booking.washPackage,
            booking.location,
            booking.date,
            "Accepted").then((res)=>{
            console.log(res);
            // const btnElement=this.myBtnRef.current;
            this.myBtnRef[id].className="btn btn-success";
        }).catch((err)=>{
            console.log(err);
            alert("Error updating booking");
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
        const status="Accepted";
        return (
            <>
                 <div className="conainer mb-4">
                <h1>Orders</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="table-reponsive">
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
                                        {bookings && bookings.map(booking=>
                                        <tr key={booking.bookingId}>
                                        
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.carNumber}</td>
                                        <td>{booking.carModel}</td>
                                        <td>{booking.owner}</td>
                                        <td>{booking.washPackage}</td>
                                        <td>{booking.location}</td>
                                        <td><button type="button" className="btn btn-primary" ref={ref=>this.myBtnRef[booking.bookingId]=ref} onClick={this.handleUpdateStatus.bind(this,booking.bookingId)}>Accept</button></td>
                                        
                                        <td><button className="btn btn-sm btn-danger"  onClick={this.handleDeleteBooking.bind(this,booking.bookingId)}><i className="fa fa-trash"></i></button></td>
                                    </tr>
                                            )}
                                        
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Order
