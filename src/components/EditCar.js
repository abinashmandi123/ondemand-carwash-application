import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCar = () => {
  const { id } = useParams(); // Get the car ID from the URL parameters

  const [carNumber, setCarNumber] = useState('');
  const [owner, setOwner] = useState('');
  const [carType, setCarType] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carImage, setCarImage] = useState('');

  useEffect(() => {
    AuthService.getCarById(id)
      .then((response) => {
        const { carNumber, owner, carModel, carType } = response.data;
        setCarNumber(carNumber);
        setOwner(owner);
        setCarModel(carModel);
        setCarType(carType);
      })
      .catch((err) => {
        toast.error('Error fetching car details.');
      });
  }, [id]);

  const handleEditCar = () => {
    AuthService.editCar(id, carNumber, owner, carType, carModel, carImage)
      .then((response) => {
        toast.success('Car updated successfully');
        window.location.reload();
      })
      .catch(() => {
        toast.error('Unable to update car');
      });
  };

  return (
    <>
      <div className="container rounded bg-white mt-5">
        <div className="row">
          <h2 className="text-right">Edit Car</h2>
          <div className="col-md-12">
            <div className="row mt-5 mb-5">
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
              <div className="col-md-4">
                <select onChange={(e) => setCarType(e.target.value)} value={carType}>
                  <option value="">Choose Car Type</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>
            <div className="row mt-5 mb-5">
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
            <button className="btn btn-primary profile-button" type="button" onClick={handleEditCar}>
              Save
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default EditCar;
