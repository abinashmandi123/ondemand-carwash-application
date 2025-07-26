import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ViewCustomer from './ViewCustomer';
import ViewWasher from './ViewWasher';

import '../css/sidenav.css';

const SideNav = () => {
    const [content, setContent] = useState('');

    const handleViewCustomer = () => setContent('customer');
    const handleViewWasher = () => setContent('washer');

    let component;
    if (content === "customer") {
        component = <ViewCustomer />;
    } else if (content === "washer") {
        component = <ViewWasher />;
    }

    return (
        <>
            <div className="sidenav">
                <NavLink
                    className="item text-white"
                    to="/viewCustomer"
                    onClick={handleViewCustomer}
                >
                    Customers
                </NavLink>
                <NavLink
                    className="item text-white"
                    to="/viewWasher"
                    onClick={handleViewWasher}
                >
                    Washers
                </NavLink>
            </div>
            <div className="content">
                {component}
            </div>
        </>
    );
};

export default SideNav;
