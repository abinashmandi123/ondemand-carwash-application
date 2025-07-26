import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch customers data when component mounts
  useEffect(() => {
    AuthService.viewCustomers()
      .then((response) => {
        console.log(response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
        // Handle any error if necessary, like showing a toast or alert
      });
  }, []);

  return (
    <div className="container mb-4">
      <h3>Customers</h3>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Contact</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {customers && customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.username}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>{customer.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomer;
