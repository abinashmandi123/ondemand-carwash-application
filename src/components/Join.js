import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { NavLink } from 'react-router-dom';
import '../css/login.css';
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

const Join = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(null);

  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.registerWasher(name, username, email, password)
        .then(response => {
          toast.success("You are registered successfully");
          history.push("/login");
          setMessage(response.data.message);
          setSuccessful(true);
        })
        .catch(error => {
          const resMessage = 
            (error.response && error.response.data && error.response.data.message) || 
            error.message || 
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        });
    }
  };

  const closeLogin = () => {
    document.getElementById("register").style.display = "none";
    setRedirect("/");
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <>
      <div className="wrapper fadeInDown" id="register">
        <div id="formContent">
          <button type="button" className="close" aria-label="Close" onClick={closeLogin}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="icon"></div>

          <Form onSubmit={handleRegister} ref={c => { this.form = c; }}>
            <div>
              <Input
                type="text"
                id="name"
                className="form-control fadeIn second"
                name="name"
                placeholder="Name"
                validations={[required, vname]}
                onChange={e => setName(e.target.value)}
              />
              <Input
                type="text"
                id="username"
                className="form-control fadeIn second"
                name="username"
                placeholder="Username"
                validations={[required, vusername]}
                onChange={e => setUsername(e.target.value)}
              />
              <Input
                type="text"
                id="email"
                className="form-control fadeIn third"
                name="email"
                placeholder="Email"
                validations={[required, email]}
                onChange={e => setEmail(e.target.value)}
              />
              <Input
                type="password"
                id="password"
                className="form-control fadeIn third"
                name="password"
                placeholder="Password"
                validations={[required, vpassword]}
                onChange={e => setPassword(e.target.value)}
              />
              <Input type="submit" className="fadeIn fourth" value="Sign Up" />
            </div>
            <CheckButton
              style={{ display: "none" }}
              ref={c => { this.checkBtn = c; }}
            />
          </Form>

          <div id="formFooter">
            <NavLink className="underlineHover" to="">Forgot Password?</NavLink>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Join;
