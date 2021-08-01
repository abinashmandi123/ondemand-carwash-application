import React, { Component } from 'react'

import AuthService from '../services/AuthService';

export class ScheduledOrder extends Component {
    constructor(){
        super();
        this.myBtnRef=[];
        this.state={
            schedules:[]
        }
    }
    componentDidMount(){
        AuthService.getSchedules().then((res)=>{
            console.log(res);
            this.setState({
                schedules:res.data
            })
        })
    }
    handleUpdateStatus(id){
        const schedules=this.state.schedules;
        let schedule=[];
        Object.values(schedules).forEach(element => {
            if(element.id==id){
                schedule=element;
            }
        });
        AuthService.updateSchedule(
            id,
            schedule.carNumber,
            schedule.carModel,
            schedule.owner,
            schedule.washPackage,
            schedule.location,
            schedule.date,
            schedule.time,
            "Accepted").then((res)=>{
            
            this.myBtnRef[id].className="btn btn-success";
            console.log(res);
            
            
        }).catch((err)=>{
            console.log(err);
            alert("Error updating booking");
        })
    }
    handleDeleteSchedule(id){
        this.setState({
            schedules:this.state.schedules.filter(schedule=>schedule.id!==id)
        })
    }
    render() {
        const schedules=this.state.schedules;
        return (
            <div>
                 <div className="conainer mb-4">
                <h1>Scheduled Orders</h1>
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
                                            <th scope="col">location</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col"></th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedules && schedules.map(schedule=>
                                        <tr key={schedule.id}>
                                        
                                        <td>{schedule.id}</td>
                                        <td>{schedule.carNumber}</td>
                                        <td>{schedule.carModel}</td>
                                        <td>{schedule.washPackage}</td>
                                        <td>{schedule.owner}</td>
                                        <td>{schedule.location}</td>
                                        <td>{schedule.date}</td>
                                        <td>{schedule.time}</td>
                                        <td></td>
                                        <td><button type="button" className="btn btn-primary" ref={ref=>this.myBtnRef[schedule.id]=ref} onClick={this.handleUpdateStatus.bind(this,schedule.id)}>Accept</button></td>
                                        
                                        <td><button className="btn btn-sm btn-danger" onClick={this.handleDeleteSchedule.bind(this,schedule.id)}><i className="fa fa-trash"></i></button></td>
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

export default ScheduledOrder
