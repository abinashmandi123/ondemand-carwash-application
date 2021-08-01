import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/sidenav.css'
import AuthService from '../services/AuthService';

export class SideNav2 extends Component {
        
    render() {
        return (
            <>
                <div className="sidenav">
                    <NavLink className="item text-white" to="/viewCars">Cars</NavLink>
                    {/* <NavLink className="item" to="/viewWasher" onClick={()=>this.handleViewWasher()}>Washers</NavLink> */}
                </div> 
                <div className="content">
                   
                </div>
            </>
        )
    }
}

export default SideNav2
