import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/sidenav.css';

const SideNav2 = () => {
    // State to manage the active content
    const [content, setContent] = useState("");

    // Function to render specific content based on selection
    const renderContent = () => {
        switch(content) {
            case 'viewCars':
                return <div> {/* Add content for cars */} </div>;
            default:
                return <div> {/* Default content, can be empty or a welcome screen */} </div>;
        }
    };

    return (
        <>
            <div className="sidenav">
                <NavLink 
                    className="item text-white" 
                    to="/viewCars"
                    onClick={() => setContent('viewCars')}
                >
                    Cars
                </NavLink>
                {/* Uncomment and update if you want to use this link */}
                {/* <NavLink className="item" to="/viewWasher" onClick={()=>setContent('viewWashers')}>Washers</NavLink> */}
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </>
    );
}

export default SideNav2;
