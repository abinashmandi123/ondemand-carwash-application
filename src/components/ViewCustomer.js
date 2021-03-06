import React, { Component } from 'react'

import AuthService from '../services/AuthService';

export class ViewCustomer extends Component {
    constructor(){
        super();
        this.state={
            customers:[]
        }
    }
    componentDidMount(){
        AuthService.viewCustomers().then((response)=>{
            console.log(response.data)
            this.setState({
                customers:response.data
            })
        })
    }
    render() {
        const customers=this.state.customers;
        return (
            <>
                 <div className="conainer mb-4">
                <h3>Customers</h3>
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
                                        {customers && customers.map(customer=>
                                        <tr key={customer.id}>
                
                                        <td>{customer.name}</td>
                                        <td>{customer.username}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.address}</td>
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

export default ViewCustomer
