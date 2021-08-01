import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../css/headers.css";

import AuthService from "../services/AuthService";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      isAdmin:false,
      isWasher:false
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }

    if(user){
    user.roles.forEach(role=>{
      if(role==="ROLE_ADMIN"){
        this.setState({
          isAdmin:true
        })
      }
    
    })
  }

  if(user){
    user.roles.forEach(role=>{
      if(role==="ROLE_WASHER"){
        this.setState({
          isWasher:true
        })
      }
    })
  }
}
    
  
  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
      isAdmin:false

    });
  }
  render() {
    const { currentUser } = this.state;
    const {isAdmin}=this.state;
    const {isWasher}=this.state;
    return (
      <>
        <div class="header-blue bg-info">
          <nav class="navbar navbar-light navbar-expand-md bg-info text-dark navigation-clean-search">
            <div class="container-fluid">
              <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                  <NavLink className="navbar-brand" exact to="/">
                <li className="nav-item">Home</li>
                  </NavLink>
                </ul>
                {isAdmin ? (<ul className="nav navbar-nav">
                <NavLink to="/adminDashboard" ><li className="nav-item mx-2">Admin Dashboard</li></NavLink>
                  <NavLink to="/usermanagement" ><li className="nav-item mx-2">User Management</li></NavLink>
                  <NavLink to="/carmanagement" ><li className="nav-item mx-2">Car Management</li></NavLink>
                  <NavLink to="/bookingmanagement" ><li className="nav-item mx-2">Booking Management</li></NavLink>
                    
                </ul>) : null}
              
                <div className="navbar-nav loginSignup">
                  {/* For Current User */}
                  {currentUser ? (
                    <div className="navbar-nav ml-auto " id="row">
                      <div className="dropdown accountDiv">
                        <button
                          className="btn btn-info dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <ul className="navbar-nav">
                          <li class="material-icons nav-item" id="accountLogo">
                            account_circle
                          </li>
                          <li className="nav-item">
                            <NavLink exact to={"/profile"} className="nav-link">
                              {currentUser.username}
                            </NavLink>
                          </li>
                          </ul>
                          

                          
                        </button>
                        { isWasher ? (<div
                          class="dropdown-menu nav-item"
                          aria-labelledby="dropdownMenu2"
                        >
                          <span class="dropdown-item" type="button">
                            <NavLink to="/editProfile" className="nav-link">
                              Edit profile
                            </NavLink>
                          </span>
                          <span class="dropdown-item" type="button">
                            <NavLink to="/addCar" className="nav-link">
                              Request
                            </NavLink>
                          </span>
                          <span class="dropdown-item" type="button">
                            <NavLink to="/viewCar" className="nav-link">
                              Notification
                            </NavLink>
                          </span>
                          <span class="dropdown-item" type="button">
                            <NavLink
                              to="/login"
                              className="nav-link"
                              onClick={this.logOut}
                            >
                              Logout
                            </NavLink>
                          </span>
                        </div>):
                        (<div
                          class="dropdown-menu nav-item"
                          aria-labelledby="dropdownMenu2"
                        >
                          <span class="dropdown-item" type="button">
                            <NavLink to="/editProfile" className="nav-link">
                              Edit profile
                            </NavLink>
                          </span>
                          <span class="dropdown-item" type="button">
                            <NavLink to="/addCar" className="nav-link">
                              Add Car
                            </NavLink>
                          </span>
                          <span class="dropdown-item" type="button">
                            <NavLink to="/viewCar" className="nav-link">
                              View Cars
                            </NavLink>
                          </span>
                          <span class="dropdown-item" type="button">
                            <NavLink
                              to="/login"
                              className="nav-link"
                              onClick={this.logOut}
                            >
                              Logout
                            </NavLink>
                          </span>
                        </div>)}
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
                        <span className="btn btn-light action-button">
                          Signup
                        </span>
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
  }
}

export default Header;
