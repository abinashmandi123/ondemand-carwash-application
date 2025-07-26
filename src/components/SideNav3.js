import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import '../css/sidenav.css';
import ViewAllBookings from './ViewAllBookings'; // example component
import ViewAllScheduledBookings from './ViewAllScheduledBookings'; // example component

const SideNav3 = () => {
    return (
        <>
            <div className="sidenav">
                <NavLink className="item text-white" to="/viewAllBookings">
                    Bookings
                </NavLink>
                <NavLink className="item text-white" to="/viewAllScheduledBookings">
                    Scheduled Bookings
                </NavLink>
            </div>

            <div className="content">
                <Switch>
                    <Route path="/viewAllBookings" component={ViewAllBookings} />
                    <Route path="/viewAllScheduledBookings" component={ViewAllScheduledBookings} />
                </Switch>
            </div>
        </>
    );
}

export default SideNav3;
