import React,{Component} from 'react'
import AuthService from '../services/AuthService'
import StripeButton from './StripeButton'

 class Checkout extends Component {
     constructor(){
         super();
         this.state={
             car:[],
          
             carPackage:"",
             address:""
         }
     }
     componentDidMount(){
         AuthService.getCarById(this.props.match.params.id).then((res)=>{
             console.log(res);
             this.setState({
                 car:res.data
             })
         })
        
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
          });
        
     }
     onSelectPackage=(event)=>{
       this.setState({
          carPackage:event.target.value,
       })
      //  if(this.carPackage==="Regular"){
      //    this.setState({price:500})
      //  }
      //  else if(this.carPackage==="Premium"){
      //    this.setState({price:1000})
      //  }
      //  else if(this.carPackage==="Deluxe"){
      //    this.setState({price:1500})
      //  }
      // else{
      //   alert("Select Package");
      // }
      // console.log(this.carPackage);
     }
     handleAddressChange=(event)=>{
        this.setState({
          address:event.target.value
        })
     }
    render(){
        const car=this.state.car;
        const carPackage=this.state.carPackage;
        const address=this.state.address;
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
            <div className="row">
          <h2 class="text-right">Checkout</h2>
            <div className="col-md-12">
              <div class="row mt-5 mb-5">
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    value={car.carNumber}
                   
                  />
                </div>
              </div>
              <div class="row mt-5 mb-5">
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    value={car.carModel}
                    
                  />
                </div>
                
              </div>
              <div class="row mt-5 mb-5">
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
                <div class="col-md-4">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Address"
                    onChange={this.handleAddressChange}
                  />
                </div>
                
              </div>
              </div>
              </div>
              <p><strong>Price:</strong>{price}</p>
            <StripeButton price={price} car={car}  washPackage={carPackage} address={address}/>
        </div>
    )
}
 }

export default Checkout