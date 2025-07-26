import React, { useState, useEffect, useRef } from 'react';
import AuthService from '../services/AuthService';

const ScheduledOrder = () => {
  const [schedules, setSchedules] = useState([]);
  const myBtnRef = useRef([]);

  useEffect(() => {
    AuthService.getSchedules().then((res) => {
      console.log(res);
      setSchedules(res.data);
    });
  }, []);

  const handleUpdateStatus = (id) => {
    const schedule = schedules.find((schedule) => schedule.id === id);
    
    if (schedule) {
      AuthService.updateSchedule(
        id,
        schedule.carNumber,
        schedule.carModel,
        schedule.owner,
        schedule.washPackage,
        schedule.location,
        schedule.date,
        schedule.time,
        "Accepted"
      )
        .then((res) => {
          myBtnRef.current[id].className = "btn btn-success";
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          alert("Error updating booking");
        });
    }
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  return (
    <div>
      <div className="container mb-4">
        <h1>Scheduled Orders</h1>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Booking Id</th>
                    <th scope="col">Car Number</th>
                    <th scope="col">Car Model</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Package</th>
                    <th scope="col">Location</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {schedules &&
                    schedules.map((schedule) => (
                      <tr key={schedule.id}>
                        <td>{schedule.id}</td>
                        <td>{schedule.carNumber}</td>
                        <td>{schedule.carModel}</td>
                        <td>{schedule.owner}</td>
                        <td>{schedule.washPackage}</td>
                        <td>{schedule.location}</td>
                        <td>{schedule.date}</td>
                        <td>{schedule.time}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary"
                            ref={(ref) => (myBtnRef.current[schedule.id] = ref)}
                            onClick={() => handleUpdateStatus(schedule.id)}
                          >
                            Accept
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledOrder;
