import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AllAppointmentsList() {
    const [appointments, setAppointments] = useState([])
    const [filterValue, setFilter] = useState("");


    const getData = async() => {
        const response = await fetch('http://localhost:8080/api/appointments')
        const data = await response.json()
        setAppointments(data.appointments)
    }

    const handleChange = (event) => {
        setFilter(event.target.value);
      };


    let filteredAppointments = [];
    if (filterValue === "") {
    filteredAppointments = appointments;
    } else {
    filteredAppointments = appointments.filter((appointment) =>
    appointment.vin === filterValue
    );
    }

    useEffect(()=> {
        getData();
    }, []
    )



    return (
        <div>
            <div>
                <input className="form-control" value={filterValue} onChange={handleChange} placeholder="Search VIN"/>
            </div>
            <h1>Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>VIP</th>
                        <th>Owner</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Finished</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map(appointment => {
                        return(
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.vip.toString()}</td>
                                <td>{appointment.owner}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.technician.name}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.finished.toString()}</td>
                                <td></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AllAppointmentsList;
