import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../services/AuthService';
import '../css/headers.css';

const Header1 = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWasher, setIsWasher] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);

      // Check user roles and set the state accordingly
      user.roles.forEach(role => {
        if (role === 'ROLE_ADMIN') {
          setIsAdmin(true);
        }
        if (role === 'ROLE_WASHER') {
          setIsWasher(true);
        }
      });
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setIsAdmin(false);
    setIsWasher(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <NavLink className="navbar-brand" to="/">Green Wash</NavLink>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
          </ul>
          {isAdmin && (
            <ul className="nav navbar-nav">
              <li className="nav-item active mx-2"><NavLink className="nav-link" to="/usermanagement">User Management</NavLink></li>
              <li className="nav-item active mx-2"><NavLink className="nav-link" to="/carmanagement">Car Management</NavLink></li>
              <li className="nav-item active mx-2"><NavLink className="nav-link" to="/bookingmanagement">Booking Management</NavLink></li>
            </ul>
          )}
          {currentUser ? (
            <div className="ml-auto">
              <ul className="navbar-nav ml-auto">
                <li className="material-icons nav-item" id="accountLogo">
                  account_circle
                </li>
                <li className="nav-item">
                  <NavLink exact to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <div>
                    <button className="btn btn-info dropdown-toggle" data-toggle="dropdown"></button>
                    {isWasher ? (
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                        <span className="dropdown-item" type="button">
                          <NavLink to="/editWasherProfile" className="nav-link">Edit profile</NavLink>
                        </span>
                        <span className="dropdown-item" type="button">
                          <NavLink to="/orders" className="nav-link">Orders</NavLink>
                        </span>
                        <span className="dropdown-item" type="button">
                          <NavLink to="/scheduledOrder" className="nav-link">Scheduled Orders</NavLink>
                        </span>
                        <span className="dropdown-item" type="button">
                          <NavLink to="/login" className="nav-link" onClick={logOut}>Logout</NavLink>
                        </span>
                      </div>
                    ) : (
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                        <span className="dropdown-item" type="button">
                          <NavLink to="/editProfile" className="nav-link">Edit profile</NavLink>
                        </span>
                        <span className="dropdown-item" type="button">
                          <NavLink to="/yourbookings" className="nav-link">Your bookings</NavLink>
                        </span>
                        <span className="dropdown-item" type="button">
                          <NavLink to="/schedules" className="nav-link">Scheduled bookings</NavLink>
                        </span>
                        <span className="dropdown-item" type="button">
                          <NavLink to="/addCar" className="nav-link">Add Car</NavLink>
                        </span>
                        <span className="dropdown-item" type="button">
                          <NavLink to="/viewCar" className="nav-link">View Cars</NavLink>
                        </span>
                        <span className="dropdown-item" type="button">
                          <NavLink to="/login" className="nav-link" onClick={logOut}>Logout</NavLink>
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item active">
                <NavLink className="nav-link" to="/register">Signup</NavLink>
              </li>
              <li className="nav-item active">
                <NavLink className="nav-link" to="/join">Join</NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header1;
