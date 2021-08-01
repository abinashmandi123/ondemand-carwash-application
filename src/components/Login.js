import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import '../css/login.css'
import {NavLink} from 'react-router-dom'
import CheckButton from "react-validation/build/button";

import AuthService from '../services/AuthService';


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleWasherLogin = this.handleWasherLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      message: "",
      redirect:null
    };
  }
  onChangeUsername=event=>{
    this.setState({
      username:event.target.value,
    
    })
  }
  onChangePassword=event=>{
    this.setState({
      password:event.target.value
    })
  }
  
handleLogin(e) {
  e.preventDefault();

  this.setState({
    message: "",
  });

  this.form.validateAll();

  if (this.checkBtn.context._errors.length === 0) {
    AuthService.login(this.state.username, this.state.password).then(
      () => {
        
        this.props.history.push("/profile");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage
        });
      }
    );
  } 
}
handleWasherLogin(e) {
  e.preventDefault();

  this.setState({
    message: "",
  });

  this.form.validateAll();

  if (this.checkBtn.context._errors.length === 0) {
    AuthService.washerLogin(this.state.username, this.state.password).then(
      () => {
        
        this.props.history.push("/profile");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          message: resMessage
        });
      }
    );
  } 
}
  closeLogin(){
    document.getElementById("login").style.display="none";
    this.setState({
      redirect:"/"
    })
  }
    render() {
      if(this.state.redirect){
        return <Redirect to={this.state.redirect}/>
      }
        return (
            <div className="modal wrapper fadeInDown" id="login">
              <div id="formContent">
              <button type="button" className="close" aria-label="Close" onClick={()=>this.closeLogin()}>
                <span aria-hidden="true">&times;</span>
              </button>
                <div className="icon"></div>
    
                <Form ref={c => {
              this.form = c;
            }} >
                  <Input type="text" id="login" className="form-control fadeIn second" name="username" placeholder="username" value={this.state.username}  validations={[required]} onChange={this.onChangeUsername}/>
                  <Input type="password" id="password" className="form-control fadeIn third" name="password" placeholder="password" value={this.state.password}  validations={[required]}  onChange={this.onChangePassword}/>
                  <Input type="submit" class="fadeIn fourth" value="Log In" onClick={this.handleLogin}/>
                  <Input type="submit" class="fadeIn fourth" value="Log In As Washer" onClick={this.handleWasherLogin}/>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
                </Form>

                <div id="formFooter">
                  <NavLink class="underlineHover" to="">Forgot Password?</NavLink>
                </div>

              </div>
              
            </div>
            
        )
    }
}

export default Login
