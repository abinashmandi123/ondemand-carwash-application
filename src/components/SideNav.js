import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ViewCustomer from './ViewCustomer'
import ViewWasher from './ViewWasher'

import '../css/sidenav.css'

export class SideNav extends Component {
    constructor(props){
        super(props);
            this.state={
                content:""
            }
        }
    
    handleViewCustomer(){
        this.setState({
            content:"customer"
        })
    }
    handleViewWasher(){
        this.setState({
            content:"washer"
        })
    }
    render() {
        const content=this.state.content;
        let component;
        if (content=="customer") {
            component=<ViewCustomer></ViewCustomer>
        }
        else if(content=="washer"){
            component=<ViewWasher></ViewWasher>
        }
        else{
            component=null
        };
        return (
            <>
               <div className="sidenav">
                    <NavLink className="item text-white" to="/viewCustomer" onClick={()=>this.handleViewCustomer()}>Customers</NavLink>
                    <NavLink className="item text-white" to="/viewWasher" onClick={()=>this.handleViewWasher()}>Washers</NavLink>
                </div> 
                <div className="content">
                    {component}
                </div>
            </>
        )
    }
}

export default SideNav
