import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/headers.css";
import AuthService from "../services/AuthService";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isWasher, setIsWasher] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);

      // Check roles and set state accordingly
      user.roles.forEach((role) => {
        if (role === "ROLE_ADMIN") {
          setIsAdmin(true);
        }
        if (role === "ROLE_WASHER") {
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
      <div className="header-blue bg-info">
        <nav className="navbar navbar-light navbar-expand-md bg-info text-dark navigation-clean-search">
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <NavLink className="navbar-brand" exact to="/">
                  <li className="nav-item">Home</li>
                </NavLink>
              </ul>
              {isAdmin && (
                <ul className="nav navbar-nav">
                  <NavLink to="/adminDashboard">
                    <li className="nav-item mx-2">Admin Dashboard</li>
                  </NavLink>
                  <NavLink to="/usermanagement">
                    <li className="nav-item mx-2">User Management</li>
                  </NavLink>
                  <NavLink to="/carmanagement">
                    <li className="nav-item mx-2">Car Management</li>
                  </NavLink>
                  <NavLink to="/bookingmanagement">
                    <li className="nav-item mx-2">Booking Management</li>
                  </NavLink>
                </ul>
              )}
              <div className="navbar-nav loginSignup">
                {currentUser ? (
                  <div className="navbar-nav ml-auto" id="row">
                    <div className="dropdown accountDiv">
                      <button
                        className="btn btn-info dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        <ul className="navbar-nav">
                          <li className="material-icons nav-item" id="accountLogo">
                            account_circle
                          </li>
                          <li className="nav-item">
                            <NavLink exact to={"/profile"} className="nav-link">
                              {currentUser.username}
                            </NavLink>
                          </li>
                        </ul>
                      </button>
                      {isWasher ? (
                        <div
                          className="dropdown-menu nav-item"
                          aria-labelledby="dropdownMenu2"
                        >
                          <span className="dropdown-item" type="button">
                            <NavLink to="/editProfile" className="nav-link">
                              Edit profile
                            </NavLink>
                          </span>
                          <span className="dropdown-item" type="button">
                            <NavLink to="/addCar" className="nav-link">
                              Request
                            </NavLink>
                          </span>
                          <span className="dropdown-item" type="button">
                            <NavLink to="/viewCar" className="nav-link">
                              Notification
                            </NavLink>
                          </span>
                          <span className="dropdown-item" type="button">
                            <NavLink
                              to="/login"
                              className="nav-link"
                              onClick={logOut}
                            >
                              Logout
                            </NavLink>
                          </span>
                        </div>
                      ) : (
                        <div
                          className="dropdown-menu nav-item"
                          aria-labelledby="dropdownMenu2"
                        >
                          <span className="dropdown-item" type="button">
                            <NavLink to="/editProfile" className="nav-link">
                              Edit profile
                            </NavLink>
                          </span>
                          <span className="dropdown-item" type="button">
                            <NavLink to="/addCar" className="nav-link">
                              Add Car
                            </NavLink>
                          </span>
                          <span className="dropdown-item" type="button">
                            <NavLink to="/viewCar" className="nav-link">
                              View Cars
                            </NavLink>
                          </span>
                          <span className="dropdown-item" type="button">
                            <NavLink
                              to="/login"
                              className="nav-link"
                              onClick={logOut}
                            >
                              Logout
                            </NavLink>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <NavLink exact to="/login">
                      <span className="btn btn-light action-button login">
                        Login
                      </span>
                    </NavLink>
                    <NavLink exact to="/register">
                      <span className="btn btn-light action-button">Signup</span>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
