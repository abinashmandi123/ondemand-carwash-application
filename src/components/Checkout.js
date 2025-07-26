import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthService from '../services/AuthService';
import StripeButton from './StripeButton';

const Checkout = () => {
  const { id } = useParams();

  const [car, setCar] = useState({});
  const [carPackage, setCarPackage] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    AuthService.getCarById(id)
      .then((res) => {
        console.log(res);
        setCar(res.data);
      })
      .catch((err) => {
        console.error('Error fetching car:', err);
      });
  }, [id]);

  const handlePackageChange = (event) => {
    setCarPackage(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  let price = 0;
  let val = 0;

  const carType = car.carType;
  if (carType === "Sedan") val = 5;
  if (carType === "SUV") val = 7;
  if (carType === "Sports") val = 10;

  if (carPackage === "Regular") price = 500 * val;
  else if (carPackage === "Premium") price = 1000 * val;
  else if (carPackage === "Deluxe") price = 1500 * val;

  return (
    <div>
      <div className="row">
        <h2 className="text-right">Checkout</h2>
        <div className="col-md-12">
          <div className="row mt-5 mb-5">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                value={car.carNumber || ''}
                readOnly
              />
            </div>
          </div>

          <div className="row mt-5 mb-5">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                value={car.carModel || ''}
                readOnly
              />
            </div>
          </div>

          <div className="row mt-5 mb-5">
            <div className="col-md-4">
              <select
                className="form-control"
                onChange={handlePackageChange}
                value={carPackage}
              >
                <option value="">Choose Package</option>
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="Deluxe">Deluxe</option>
              </select>
            </div>
          </div>

          <div className="row mt-5 mb-5">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                onChange={handleAddressChange}
                value={address}
              />
            </div>
          </div>
        </div>
      </div>
      <p><strong>Price:</strong> {price}</p>
      <StripeButton price={price} car={car} washPackage={carPackage} address={address} />
    </div>
  );
};

export default Checkout;
