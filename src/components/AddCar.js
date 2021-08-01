import React, { Component } from "react";

import "../css/addCar.css";
import AuthService from "../services/AuthService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class AddCar extends Component {
  constructor(props) {
    super(props);
    this.handleAddCar = this.handleAddCar.bind(this);
    this.onChangeCarNumber = this.onChangeCarNumber.bind(this);
    this.onChangeCarModel = this.onChangeCarModel.bind(this);
    this.onChangeCarType = this.onChangeCarType.bind(this);
    this.onChangeCarImage = this.onChangeCarImage.bind(this);
    this.state = {
      carNumber: "",
      owner:"",
      carModel: "",
      carType: "",
      carImage:"",
      redirect: null,
    };
  }
  onChangeCarNumber = (event) => {
    this.setState({
      carNumber: event.target.value,
    });
  };
  onChangeCarModel = (event) => {
    this.setState({
      carModel: event.target.value,
    });
  };
  onChangeCarType = (event) => {
    this.setState({
      carType: event.target.value,
    });
  };
  onChangeCarImage=(event)=>{
    this.setState({
      carImage:event.target.files[0]
    })
  }
  handleAddCar() {
    AuthService.addCar(
      this.state.carNumber,
      this.state.owner,
      this.state.carType,
      this.state.carModel,
      this.state.carImage
    ).then((response) => {
      toast.success("car added succesfully");
        this.props.history.push("/addCar");
        window.location.reload();
        console.log(response);
    })
  }
  render() {
    return (
      <>
        <div className="container rounded bg-white mt-5">
          <div className="row">
          <h2 class="text-right">Add Car</h2>
            <div className="col-md-12">
              <div class="row mt-5 mb-5">
              <label className="lbl"> Car Number</label>
                <div class="col-md-4">
                  
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Car Number"
                    onChange={this.onChangeCarNumber}
                  />
                </div>
              </div>
              <div class="row mt-5 mb-5">
              <label className="lbl"> Car Model</label>
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Car Model"
                    onChange={this.onChangeCarModel}
                  />
                </div>
              </div>
              <div class="row mt-5 mb-5">
              <label className="lbl"> Car Type</label>
                <div class="col-md-4">
                 <select onChange={this.onChangeCarType}>
                 <option value="">Choose Car Type</option>
                   <option value="SUV">SUV</option>
                   <option value="Sedan">Sedan</option>
                   <option value="Sports">Sports</option>
                 </select>
                </div>
              </div>
              <div class="row mt-5 mb-5">
              <label className="lbl"> Car Image</label>
                <div class="col-md-4">
                  <input
                    type="file"
                    class="form-control"
                    placeholder=""
                    onChange={this.onChangeCarImage}
                  />
                </div>
              </div>
            </div>
            <div class="mt-5 text-right"><button class="btn btn-primary profile-button" type="button" onClick={this.handleAddCar}>Add Car</button></div>
          </div>
          <ToastContainer />
        </div>
      </>
    );
  }
}

export default AddCar;
