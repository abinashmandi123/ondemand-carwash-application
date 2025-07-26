import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditWasherProfile = (props) => {
  // State hooks for form inputs
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  // Fetch washer details on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;

    AuthService.getWasher(id)
      .then((res) => {
        setName(user.name);
        setUsername(user.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setContact(res.data.contact);
        setAddress(res.data.address);
        setProfilePic(res.data.profilePic);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to handle profile update
  const handleEditProfile = () => {
    AuthService.editWasherProfile(
      name,
      username,
      email,
      password,
      contact,
      address,
      profilePic
    )
      .then((response) => {
        toast.success("Profile updated successfully");
        props.history.push("/profile"); // Redirect to profile page
        window.location.reload();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container rounded bg-white mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex flex-row align-items-center back">
                <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                <h6>Back to home</h6>
              </div>
              <h6 className="text-right">Edit Profile</h6>
            </div>

            {/* Name and Username */}
            <div className="row mt-2">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  readOnly
                />
              </div>
            </div>

            {/* Email and Contact */}
            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            {/* Address and Password */}
            <div className="row mt-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Profile Picture */}
            <div className="row mt-3">
              <div className="col-md-6">
                <label>Choose Profile picture</label>
              </div>
              <div className="col-md-6">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 text-right">
          <button
            className="btn btn-primary profile-button"
            type="button"
            onClick={handleEditProfile}
          >
            Save Profile
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditWasherProfile;
