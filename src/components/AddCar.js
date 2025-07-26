import React, { useState } from "react";
import "../css/addCar.css";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

const AddCar = () => {
  const [carNumber, setCarNumber] = useState("");
  const [owner, setOwner] = useState(AuthService.getCurrentUser()?.username || "");
  const [carModel, setCarModel] = useState("");
  const [carType, setCarType] = useState("");
  const [carImage, setCarImage] = useState(null);

  const history = useHistory();

  const handleAddCar = () => {
    if (!carNumber || !carModel || !carType || !carImage) {
      toast.error("Please fill in all fields.");
      return;
    }

    AuthService.addCar(carNumber, owner, carType, carModel, carImage)
      .then(() => {
        toast.success("Car added successfully");
        history.push("/addCar");
      })
      .catch((err) => {
        toast.error("Failed to add car");
        console.error(err);
      });
  };

  return (
    <div className="container rounded bg-white mt-5">
      <div className="row">
        <h2 className="text-right">Add Car</h2>
        <div className="col-md-12">
          <div className="row mt-5 mb-5">
            <label className="lbl">Car Number</label>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Car Number"
                value={carNumber}
                onChange={(e) => setCarNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-5 mb-5">
            <label className="lbl">Car Model</label>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Car Model"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-5 mb-5">
            <label className="lbl">Car Type</label>
            <div className="col-md-4">
              <select
                className="form-control"
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
              >
                <option value="">Choose Car Type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>

          <div className="row mt-5 mb-5">
            <label className="lbl">Car Image</label>
            <div className="col-md-4">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setCarImage(e.target.files[0])}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 text-right">
          <button
            className="btn btn-primary profile-button"
            type="button"
            onClick={handleAddCar}
          >
            Add Car
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCar;
