import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import '../css/profile.css';

const Profile = () => {
  const [user, setUser] = useState([]);
  const [profilePic, setProfilePic] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    const id = currentUser.id;
    if (currentUser) {
      currentUser.roles.forEach(role => {
        if (role === "ROLE_WASHER") {
          AuthService.getWasher(id).then((res) => {
            setUser(res.data);
            setProfilePic(res.data.profilePic);
          });
        } else {
          AuthService.getCustomer(id).then((res) => {
            setUser(res.data);
            setProfilePic(res.data.profilePic);
          });
        }
      });
    }
  }, [currentUser]);

  return (
    <div>
      <div className="container rounded bg-white mt-5">
        <div className="row">
          <div className="col-md-4 border-right">
            {profilePic ? (
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img className="rounded-circle mt-5" src={`data:image/jpeg;base64,${profilePic.data}`} width="90" alt="" />
                <span className="font-weight-bold"></span>
                <span className="text-black-50"></span>
                <span></span>
              </div>
            ) : (
              <div className="circle d-flex flex-column align-items-center text-center p-3 py-5">
                <span className="font-weight-bold"></span>
                <span className="text-black-50">Set Profile Picture</span>
                <span></span>
              </div>
            )}
          </div>
          <div className="col-md-8">
            <div className="row mt-5">
              <div className="col-md-6"><h4>Name</h4></div>
              <div className="col-md-6"><p>{user.name}</p></div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6"><h4>Username</h4></div>
              <div className="col-md-6"><p>{user.username}</p></div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6"><h4>Email</h4></div>
              <div className="col-md-6"><p>{user.email}</p></div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6"><h4>Contact</h4></div>
              <div className="col-md-6"><p>{user.contact}</p></div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6"><h4>Address</h4></div>
              <div className="col-md-6"><p>{user.address}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
