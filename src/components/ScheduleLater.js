import React, {Component} from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker"

import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../services/AuthService";
import StripeButton1 from "./StripeButton2";


export default class ScheduleLater extends Component{
    constructor(){
      super();
      this.onChangeCarNumber=this.onChangeCarNumber.bind(this);
      this.onChangeCarModel=this.onChangeCarModel.bind(this);
      this.onChangeLocation=this.onChangeLocation.bind(this);
      this.onSelectPackage=this.onSelectPackage.bind(this);
      this.onChangeDate=this.onChangeDate.bind(this);
      this.onChangeTime=this.onChangeTime.bind(this);
      this.handleDateSelect=this.handleDateSelect.bind(this);
      this.state={
        car:[],
        carPackage:"",
        location:"",
        date:"",
        time:""
      }
    }

    componentDidMount(){
      AuthService.getCarById(this.props.match.params.id).then((res)=>{
        console.log(res);
        this.setState({
          car:res.data,
          startDate:new Date()
        });
      })
    }
   onChangeCarNumber(event){
      this.setState({
          carNumber:event.target.value
      });
  }
   onChangeCarModel(event){
      this.setState({
          carModel:event.target.value
      });
  }
  onSelectPackage=(event)=>{
    this.setState({
       carPackage:event.target.value,
    })
  }
  onChangeLocation=(event)=>{
    this.setState({
      location:event.target.value
    })
  }
  handleDateSelect=(date)=>{
    this.setState({
      date:date
    })
  }
  onChangeDate=(date)=>{
    this.setState({
      date:date
    })
  }
  onChangeTime=(time)=>{
    this.setState({
      time:time
    })
  }
  render(){
    const car=this.state.car;
    // let startDate=this.state.startDate;
    let timeNow=new Date().toLocaleTimeString();
    const carPackage=this.state.carPackage;
    const location=this.state.location;
    const date=this.state.date;
    const time=this.state.time;
        let price=0;
        let val=0;
        const carType=this.state.car.carType;
        if(carType=="Sedan"){
            val=5;
        }
        if(carType=="SUV"){
          val=7;
        }
      if(carType=="Sports"){
        val=10;
      }
        if(carPackage=="Regular"){
          price=500*val;
        }
        else if(carPackage=="Premium"){
          price=1000*val;
        }
        else if(carPackage=="Deluxe"){
          price=1500*val;
        }
        else{
          console.log("select package");
        }
  return (
    <div>
      <div className="container rounded bg-white mt-5">
        <div className="row">
          <h2 class="text-right">Schedule Wash</h2>
          <div className="col-md-12">
            <div class="row mt-5 mb-5">
              <label className="lbl"> Car Number</label>
              <div class="col-md-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Car Number"
                  value={car.carNumber}
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
                  value={car.carModel}
                />
              </div>
            </div>
            <div class="row mt-5 mb-5">
              <label className="lbl"> Package</label>
              <div class="col-md-4">
              <select onChange={this.onSelectPackage}>
                 <option value="">Choose Package</option>
                   <option value="Regular">Regular</option>
                   <option value="Premium">Premium</option>
                   <option value="Deluxe">Deluxe</option>
                 </select>
              </div>
            </div>
            <div class="row mt-5 mb-5">
              <label className="lbl"> Location</label>
              <div class="col-md-4">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter location"
                  onChange={this.onChangeLocation}
                />
              </div>
            </div>
            <div class="row mt-5 mb-5">
              <label className="lbl"> Choose Date</label>
              <div class="col-md-4">
                <DatePicker
                  selected={this.state.date}
                  className='filter-input'
                  onSelect={this.handleDateSelect} //when day is clicked
                  onChange={this.onChangeDate}
                  isClearable={true}
                />
              </div>
            </div>
            <div class="row mt-5 mb-5">
              <label className="lbl"> Choose Time</label>
              <div class="col-md-4">
                <TimePicker 
                selected={this.state.time}
                onChange={this.onChangeTime}
                />
              </div>
            </div>
          </div>
          <p><strong>Price:</strong>{price}</p>
            <StripeButton1 price={price} car={car}  washPackage={carPackage} location={location} date={date} time={time}/>
        </div>
      </div>
    </div>
  );
  }
}
