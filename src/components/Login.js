import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../services/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [redirect, setRedirect] = useState(null);
  const [serverError, setServerError] = useState('');

  const intialValues={
    username: '',
    password: ''
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = (values,{setSubmitting}) => {
    // e.preventDefault();

    AuthService.login(values.username, values.password).then(
      () => {
        setRedirect('/'); // After successful login, redirect to the homepage
      },
      (error) => {
        const resMessage = error.message || error.toString();
        setServerError(resMessage);
        setSubmitting(false);
      }
    );
  };

  if (redirect) {
    return <Redirect to={redirect} />; // This will redirect to the stored URL
  }

  return (
    <div className='container mt-5'>
      <div className="row justify-content-center">
       <div className="col-md-6">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Login</h3>
      <Formik 
        initialValues={intialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({isSubmitting})=>(
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter your username"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            {serverError && <div className="text-danger">{serverError}</div>}
            <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-3">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
