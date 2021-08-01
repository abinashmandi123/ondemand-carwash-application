import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import AuthService from '../services/AuthService';

export class ViewWasher extends Component {
    constructor(){
        super();
        this.state={
            washers:[]
        }
    }
    componentDidMount(){
        AuthService.viewWashers().then((response)=>{
            console.log(response.data)
            this.setState({
                washers:response.data
            })
        })
    }
    render() {
        const washers=this.state.washers;
        return (
            <>
                <div className="conainer mb-4">
                <h3>Washers</h3>
                <div className="row">
                    <div className="col-12">
                        <div className="table-reponsive">
                            <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Address</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {washers && washers.map(washer=>
                                        <tr key={washer.id}>
                
                                        <td>{washer.name}</td>
                                        <td>{washer.username}</td>
                                        <td>{washer.email}</td>
                                        <td>{washer.address}</td>
                                        <td><NavLink exact to=""><button type="button" className="btn btn-primary">Edit</button></NavLink></td>
                                        <td><button className="btn btn-sm btn-danger" ><i className="fa fa-trash"></i></button></td>
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

export default ViewWasher
