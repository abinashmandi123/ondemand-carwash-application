import React from 'react';
import { useHistory } from 'react-router-dom'; // React Router v5
import SideNav from './SideNav';

const UserMgmt = () => {
  const history = useHistory(); // Using the useHistory hook for navigation

  // Handle navigation to different views
  const handleViewCustomers = () => {
    history.push("/viewCustomer"); // Navigate to View Customers page
  };

  const handleAddWasher = () => {
    history.push("/addWasher"); // Navigate to Add Washer page
  };

  return (
    <>
      <SideNav />
      <div>
        <button onClick={handleViewCustomers}>View Customers</button>
        <button onClick={handleAddWasher}>Add Washer</button>
      </div>
    </>
  );
}

export default UserMgmt;
