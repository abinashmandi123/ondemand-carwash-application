import React, { Component } from 'react'

import AuthService from '../services/AuthService';

export class EditCar extends Component {
    constructor(props){
        super(props);
        this.handleEditCar = this.handleEditCar.bind(this);
        this.onChangeCarNumber = this.onChangeCarNumber.bind(this);
        this.onChangeCarModel = this.onChangeCarModel.bind(this);
        this.onChangeCarType = this.onChangeCarType.bind(this);
        this.onChangeCarImage = this.onChangeCarImage.bind(this);
        this.state={
            carNumber:"",
            owner:"",
            carType:"",
            carModel:"",
            carImage:"",
            car:[]
        }

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
      handleEditCar() {
        AuthService.editCar(
          this.props.match.params.id,
          this.state.carNumber,
          this.state.owner,
          this.state.carType,
          this.state.carModel,
          this.state.carImage
        ).then((response) => {
          alert("car updated succesfully");
            this.props.history.push("/viewCar");
            window.location.reload();
            console.log(response);
        })
      }

      componentDidMount(){
        AuthService.getCarById(this.props.match.params.id).then((response)=>{
            console.log(response.data)
            this.setState({
                car:response.data
            })
        }
            
        );
        };
    render() {
        const car=this.state.car;
        return (
            <>
                <div className="container rounded bg-white mt-5">
          <div className="row">
          <h2 class="text-right">Edit Car</h2>
            <div className="col-md-12">
              <div class="row mt-5 mb-5">
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
            <div class="mt-5 text-right"><button class="btn btn-primary profile-button" type="button" onClick={this.handleEditCar}>Save</button></div>
          </div>
        </div>
            </>
        )
    }
}

export default EditCar
