import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../services/AuthService";
import StripeButton1 from "./StripeButton2";

const ScheduleLater = (props) => {
  const [car, setCar] = useState([]);
  const [carPackage, setCarPackage] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    AuthService.getCarById(props.match.params.id).then((res) => {
      console.log(res);
      setCar(res.data);
      setDate(new Date());
    });
  }, [props.match.params.id]);

  const handleSelectPackage = (event) => {
    setCarPackage(event.target.value);
  };

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleChangeDate = (date) => {
    setDate(date);
  };

  const handleChangeTime = (time) => {
    setTime(time);
  };

  const calculatePrice = () => {
    let price = 0;
    let val = 0;
    const carType = car.carType;

    if (carType === "Sedan") {
      val = 5;
    } else if (carType === "SUV") {
      val = 7;
    } else if (carType === "Sports") {
      val = 10;
    }

    if (carPackage === "Regular") {
      price = 500 * val;
    } else if (carPackage === "Premium") {
      price = 1000 * val;
    } else if (carPackage === "Deluxe") {
      price = 1500 * val;
    } else {
      console.log("Select package");
    }
    return price;
  };

  const price = calculatePrice();

  return (
    <div>
      <div className="container rounded bg-white mt-5">
        <div className="row">
          <h2 className="text-right">Schedule Wash</h2>
          <div className="col-md-12">
            <div className="row mt-5 mb-5">
              <label className="lbl">Car Number</label>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Car Number"
                  value={car.carNumber || ""}
                  readOnly
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
                  value={car.carModel || ""}
                  readOnly
                />
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <label className="lbl">Package</label>
              <div className="col-md-4">
                <select onChange={handleSelectPackage} value={carPackage}>
                  <option value="">Choose Package</option>
                  <option value="Regular">Regular</option>
                  <option value="Premium">Premium</option>
                  <option value="Deluxe">Deluxe</option>
                </select>
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <label className="lbl">Location</label>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter location"
                  onChange={handleChangeLocation}
                  value={location}
                />
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <label className="lbl">Choose Date</label>
              <div className="col-md-4">
                <DatePicker
                  selected={date}
                  className="filter-input"
                  onChange={handleChangeDate}
                  isClearable={true}
                />
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <label className="lbl">Choose Time</label>
              <div className="col-md-4">
                <TimePicker
                  value={time}
                  onChange={handleChangeTime}
                />
              </div>
            </div>
            <div className="row mt-5 mb-5">
              <label className="lbl">Price</label>
              <div className="col-md-4">{price}</div>
            </div>
          </div>
          <StripeButton1
            price={price}
            car={car}
            washPackage={carPackage}
            location={location}
            date={date}
            time={time}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleLater;
