import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {NavLink} from 'react-router-dom'
import '../css/login.css'
import { isEmail } from "validator";

import AuthService from '../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vname = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The name must be between 3 and 20 characters.
      </div>
    );
  }
};
const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
export class Register extends Component {
  constructor(props){
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state={
      name:'',
      username:'',
      email:'',
      password:'',
      successful:false,
      message:'',
      redirect:null
    }
  }
 
   onChangeName=event=>{
    this.setState({
      name:event.target.value,
    
    })
  }
  onChangeUsername=event=>{
    this.setState({
      username:event.target.value,
    
    })
  }
  onChangeEmail=event=>{
    this.setState({
      email:event.target.value,
    
    })
  }
  onChangePassword=event=>{
    this.setState({
      password:event.target.value
    })
  }
  
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.name,
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          toast.success("ypu are registered succesfully");
          Input.value="";
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
          
        }
        
      );
    }
  }
  closeLogin(){
    document.getElementById("register").style.display="none";
    this.setState({
      redirect:"/"
    })
  }
  render() {
    if(this.state.redirect){
      return <Redirect to={this.state.redirect}/>
    }
    return (
      <>
         <div className="wrapper fadeInDown" id="register">
            <div id="formContent">
            <button type="button" className="close" aria-label="Close" onClick={()=>this.closeLogin()}>
                <span aria-hidden="true">&times;</span>
              </button>
            <div className="icon">
            </div>

              <div className="fadeIn first">
              
              </div>
              
            <Form onSubmit={this.handleRegister} ref={c=>{
              this.form=c;
            }}>
    
              {/* {!this.state.successful && ( */}
              <div>
              <Input type="text" id="name" className="form-control fadeIn second" name="name" placeholder="name"  validations={[required, vname]} onChange={this.onChangeName} />
              <Input type="text" id="username" className="form-control fadeIn second" name="username" placeholder="username" validations={[required, vusername]} onChange={this.onChangeUsername}/>
              <Input type="text" id="email" className="form-control fadeIn third" name="email" placeholder="email" validations={[required, email]} onChange={this.onChangeEmail}/>
              <Input type="password" id="password" className="form-control fadeIn third" name="password" placeholder="password" validations={[required, vpassword]} onChange={this.onChangePassword}/>
              <Input type="submit" className="fadeIn fourth" value="Sign Up"/>
            
              </div>
              {/* )}
              {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div> */}
            {/* )} */}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
            </Form>
              

            <div id="formFooter">
              <NavLink className="underlineHover" to="">Forgot Password?</NavLink>
            </div>

          </div>
          <ToastContainer />
      </div>
      </>
    )
  }
}

export default Register

