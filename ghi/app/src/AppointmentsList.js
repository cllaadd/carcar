import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AppointmentsList() {
    const [appointments, setAppointments] = useState([])


    const getData = async() => {
        const response = await fetch('http://localhost:8080/api/appointments/filtered/')
        const data = await response.json()
        setAppointments(data.appointments)
    }


    const handleDelete = async(id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/edit/${id}/`, {method:"DELETE"})
        const data = await response.json()
        console.log(data)
        getData();
        window.location = "/appointments"
    }

    const handleFinish = async(id) => {
        const status = {finished : true}
        const fetchConfig = {
            method: 'put',
            body: JSON.stringify(status),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(`http://localhost:8080/api/appointments/edit/${id}/`, fetchConfig)
        const data = await response.json();
        console.log(data)
        getData();
        window.location = "/appointments"
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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        return(
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                <button className="btn btn-success m-2" onClick={()=> {handleFinish(appointment.id)}}>Finish</button>
                                </td>
                                <td>
                                <button className="btn btn-danger m-2" onClick={()=> {handleDelete(appointment.id)}}>Cancel</button>
                                </td>
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
