import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/viewAllCars.css'

import AuthService from '../services/AuthService';

export class ViewAllCars extends Component {
    constructor(){
        super();
        this.handleDeleteCar=this.handleDeleteCar.bind(this);
        this.state={
            cars:[]
        }
    }
    componentDidMount(){
        AuthService.viewAllCars().then((response)=>{
            console.log(response.data)
            this.setState({
                cars:response.data
            })
        }
            
        );
        };
        handleDeleteCar(id){
            AuthService.deleteCar(id).then(response=>{
                if(response.data!=null){
                    alert("car deleted successfully");
                    this.setState({
                        cars:this.state.cars.filter(car=>car.id!==id)
                    })
                }
            });
        }
    render() {
        const cars=this.state.cars;
        return (
            <>
                <div className="container mb-4">
                
                <h1>Cars</h1>
                <div className="row">
                    <div className="col-12">
                        <div className="table-reponsive">
                            <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Car Image</th>
                                            <th scope="col">Car Number</th>
                                            <th scope="col">Car Type</th>
                                            <th scope="col">Car Model</th>
                                            <th scope="col">Car Owner</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cars && cars.map(car=>
                                        <tr key={car.id}>
                                        <td><img src={`data:image/jpeg;base64,${car.carImage.data}`} /></td>
                                        <td>{car.carNumber}</td>
                                        <td>{car.carType}</td>
                                        <td>{car.carModel}</td>
                                        <td>{car.owner}</td>
                                        <td><NavLink exact to={"/editCar/"+car.id}><button type="button" className="btn btn-primary">Edit</button></NavLink></td>
                                        <td><button className="btn btn-sm btn-danger" onClick={this.handleDeleteCar.bind(this,car.id)}><i className="fa fa-trash"></i></button></td>
                                    </tr>
                                            )}
                                        
                                    </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <button className="addBtn btn btn-primary my-5">Add Car</button>
            </div>
            </>
        )
    }
}

export default ViewAllCars
