import React, { Component } from 'react'

import AuthService from '../services/AuthService'

import '../css/payment.css'

export class Payment extends Component {

    makePayment(){
            AuthService.redirectPayment().then((response)=>{
                console.log(response);
            });
            
    }
    render() {
        return (
            <>
               <form >
    <div className="container register">
        <div className="row">
            <div className="col-md-3 register-left">
            </div>
            <div className="col-md-9 register-right">
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <h3 className="register-heading">Welcome to Paytm Pay Payment</h3>
                        <div className="row register-form">
                            <div className="col-md-10">
                                {/* <div className="form-group">
                                    <input id="ORDER_ID" class="form-control"
                                           name="ORDER_ID" placeholder="Order Id"  />
                                </div> */}
                                <div className="form-group">
                                    <input type="text" id="ORDER_ID" class="form-control" placeholder="Order ID" 
                                           name="ORDER_ID"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" class="form-control" placeholder="Customer ID" 
                                           name="CUST_ID"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" class="form-control" placeholder="Car Number" 
                                           name="INDUSTRY_TYPE_ID"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Car Model" 
                                           name="CHANNEL_ID"/>
                                </div>
                                <div classname="form-group">
                                    <input type="text" class="form-control" placeholder="Amount" 
                                           name="TXN_AMOUNT"/>
                                </div>
                                <button type="submit" className="btnRegister btn btn-primary" onClick={()=>this.makePayment()}>Pay with Paytm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form> 
            </>
        )
    }
}

export default Payment
