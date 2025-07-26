import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const Schedules = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        const owner = user.username;

        AuthService.getScheduleByOwner(owner).then((res) => {
            console.log(res);
            setSchedules(res.data);
        });
    }, []); // Empty dependency array ensures this runs only once after component mounts

    const handleDeleteSchedule = (id) => {
        setSchedules(schedules.filter(schedule => schedule.id !== id));
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
                                        <th scope="col">Package</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schedules && schedules.map(schedule =>
                                        <tr key={schedule.id}>
                                            <td>{schedule.id}</td>
                                            <td>{schedule.carNumber}</td>
                                            <td>{schedule.carModel}</td>
                                            <td>{schedule.washPackage}</td>
                                            <td>{schedule.location}</td>
                                            <td>{schedule.date}</td>
                                            <td>{schedule.time}</td>
                                            <td>{schedule.status}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeleteSchedule(schedule.id)}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedules;
