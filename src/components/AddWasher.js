import React, { Component } from "react";

import '../css/addWasher.css'

export class AddWasher extends Component {
  render() {
    return (
      <div className="background">
        <div className="container ">
            <h1 className="">Add Washer</h1>
          <div className="row my-5">
            <div className="col-md-6 justify-content-around">
              <input type="text" className="form-control" placeholder="Full Name"></input>
            </div>
            <div className="col-md-6 justify-content-around">
              <input type="text" className="form-control" placeholder="Age"></input>
            </div>
            
          </div>
          <div className="row my-5">
            <div className="col-md-6 justify-content-around">
              <input type="text" className="form-control" placeholder="Full Name"></input>
            </div>
            <div className="col-md-6 justify-content-around">
              <input type="text" className="form-control" placeholder="Age"></input>
            </div>
            
          </div>
          <div className="row my-5">
            <div className="col-md-6 justify-content-around">
              <input type="text" className="form-control" placeholder="Full Name"></input>
            </div>
            <div className="col-md-6 justify-content-around">
              <input type="text" className="form-control" placeholder="Age"></input>
            </div>
            
          </div>
          <div class="mt-5"><button class="btn btn-primary profile-button" type="button" onClick={this.handleAddCar}>Add Washer</button></div>
        </div>
      </div>
    );
  }
}

export default AddWasher;
