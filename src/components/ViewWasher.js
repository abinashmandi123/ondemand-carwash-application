import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/viewWasher.css';

const ViewWasher = () => {
  const [washers, setWashers] = useState([]);

  // Fetch washers data when component mounts
  useEffect(() => {
    AuthService.viewWashers()
      .then((response) => {
        console.log(response.data);
        setWashers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle delete washer
  const handleDeleteWasher = (id) => {
    AuthService.deleteWasher(id)
      .then(() => {
        toast.success("Washer deleted successfully");
        setWashers((prevWashers) => prevWashers.filter((washer) => washer.id !== id));
      })
      .catch(() => {
        toast.error("Unable to delete washer");
      });
  };

  // Handle add washer
  const handleAddWasher = () => {
    // Assuming you use `useHistory` or `useNavigate` for navigation if required in your app
    // Using `window.location` for now to simulate the redirection
    window.location.href = "/addWasher";
  };

  return (
    <>
      <div className="container mb-4">
        <h3>Washers</h3>
        <div className="text-left my-5">
          <button className="btn btn-primary profile-button" type="button" onClick={handleAddWasher}>
            Add Washer
          </button>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {washers &&
                    washers.map((washer) => (
                      <tr key={washer.id}>
                        <td>{washer.name}</td>
                        <td>{washer.username}</td>
                        <td>{washer.email}</td>
                        <td>{washer.address}</td>
                        <td>{washer.contact}</td>
                        <td>
                          <NavLink exact to={`/editWasher/${washer.id}`}>
                            <button type="button" className="btn btn-primary">
                              Edit
                            </button>
                          </NavLink>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteWasher(washer.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ViewWasher;
