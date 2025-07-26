import React, { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditWasher = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(undefined);
  const [washer, setWasher] = useState([]);

  useEffect(() => {
    // Fetch washer data when the component mounts
    AuthService.getWasher(props.match.params.id)
      .then((res) => {
        setWasher(res.data);
        setName(res.data.name);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setContact(res.data.contact);
        setAddress(res.data.address);
        setProfilePic(res.data.profilePic);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.id]);

  const handleSaveWasher = () => {
    const id = props.match.params.id;
    AuthService.editWasher(
      id,
      name,
      username,
      email,
      contact,
      password,
      address,
      profilePic?.data // Ensure this exists before passing
    )
      .then((res) => {
        toast.success("Washer edited successfully");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Unable to edit washer");
        console.log(err);
      });
  };

  return (
    <div className="background">
      <div className="container">
        <h1>Edit Washer</h1>
        <div className="row my-5">
          <label className="lbl">Name</label>
          <div className="col-md-6 justify-content-around">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="row my-5">
          <label className="lbl">Username</label>
          <div className="col-md-6 justify-content-around">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="row my-5">
          <label className="lbl">Email</label>
          <div className="col-md-6 justify-content-around">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="row my-5">
          <label className="lbl">Contact</label>
          <div className="col-md-6 justify-content-around">
            <input
              type="text"
              className="form-control"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>

        <div className="row my-5">
          <label className="lbl">Password</label>
          <div className="col-md-6 justify-content-around">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="row my-5">
          <label className="lbl">Address</label>
          <div className="col-md-6 justify-content-around">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="row my-5">
          <label className="lbl">Profile Picture</label>
          <div className="col-md-6 justify-content-around">
            <input
              type="file"
              className="form-control"
              placeholder="Profile Pic"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
        </div>

        <div className="mt-5">
          <button
            className="btn btn-primary profile-button"
            type="button"
            onClick={handleSaveWasher}
          >
            Save Washer
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditWasher;
