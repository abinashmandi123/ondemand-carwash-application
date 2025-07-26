import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/viewCar.css';

const ViewCar = () => {
  const [cars, setCars] = useState([]);

  // Fetch cars data when component mounts
  useEffect(() => {
    AuthService.viewCar()
      .then((response) => {
        console.log(response.data);
        setCars(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unable to load cars");
      });
  }, []);

  // Handle car deletion
  const handleDeleteCar = (id) => {
    AuthService.deleteCar(id)
      .then((response) => {
        if (response.data != null) {
          toast.success("Car deleted successfully");
          setCars(cars.filter((car) => car.id !== id));
        }
      })
      .catch(() => {
        toast.error("Unable to delete car");
      });
  };

  return (
    <div className="container mb-4">
      <h1>Your Cars</h1>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Car Image</th>
                  <th scope="col">Car Number</th>
                  <th scope="col">Car Type</th>
                  <th scope="col">Car Model</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cars && cars.map((car) => (
                  <tr key={car.id}>
                    <td><img src={`data:image/jpeg;base64,${car.carImage.data}`} alt="Car" /></td>
                    <td>{car.carNumber}</td>
                    <td>{car.carType}</td>
                    <td>{car.carModel}</td>
                    <td><NavLink exact to={`/payment/${car.id}`}><button type="button" className="btn btn-primary">Book Wash</button></NavLink></td>
                    <td><NavLink exact to={`/scheduleWash/${car.id}`}><button type="button" className="btn btn-primary">Schedule Wash</button></NavLink></td>
                    <td><NavLink exact to={`/editCar/${car.id}`}><button type="button" className="btn btn-primary">Edit</button></NavLink></td>
                    <td><button className="btn btn-sm btn-danger" onClick={() => handleDeleteCar(car.id)}><i className="fa fa-trash"></i></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewCar;
