import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AppointmentsList() {
    const [appointments, setAppointments] = useState([])

    const getData = async() => {
        const response = await fetch('http://localhost:8080/api/appointments/')
        const data = await response.json()
        console.log(data)
        setAppointments(data.appointments)
    }

    useEffect(()=> {
        getData();
    }, []
    )

    return (
        <div>
            <h1>Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Owner</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments?.map(appointment => {
                        return(
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <NavLink className="btn btn-primary" id="new-appointment-link" aria-current="page" to="new">New appointment</NavLink>
        </div>
    )
}

export default AppointmentsList;
