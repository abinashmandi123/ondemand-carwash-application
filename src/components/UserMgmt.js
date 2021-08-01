import React, { Component } from 'react'
import SideNav from './SideNav';
import ViewCustomer from './ViewCustomer';
export class UserMgmt extends Component {
    constructor(props){
        super(props);
        this.handleViewCustomers=this.handleViewCustomers.bind(this);
        this.handleAddWasher=this.handleAddWasher.bind(this);
    }
    handleViewCustomers(){
        this.props.history.push("/viewCustomer");
    }
    handleAddWasher(){
        this.props.history.push("/addWasher");
    }
    render() {
        return (
            <>
               <SideNav></SideNav>
            </>
        )
    }
}

export default UserMgmt
