import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AllAppointmentsList() {
    const [appointments, setAppointments] = useState([])
    const [filterValue, setFilter] = useState("");
    const [filterField, setFilterField] = useState("VIN");

    const handleChange = (e) => {
        setFilter(e.target.value);
      };

    const handleFieldChange = (e) => {
        setFilterField(e.target.value);
      };

    const getData = async() => {
        const response = await fetch('http://localhost:8080/api/appointments')
        const data = await response.json()
        setAppointments(data.appointments)
    }

    let filteredList = [];
    if (filterValue === "") {
      filteredList = appointments;
    } else {
      filteredList = appointments.filter((appointment) =>
        appointment[filterField].includes(filterValue)
      );
    }

    useEffect(()=> {
        getData();
    }, []
    )



    return (
        <div>
            <div>
                <select onChange={handleFieldChange}>
                    <option>VIN</option>
                    <option>date</option>
                    <option>reason</option>
                </select>
                <input value={filterValue} onChange={handleChange}/>
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
                    {filteredList.map(appointment => {
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
            <NavLink className="btn btn-primary" id="new-appointment-link" aria-current="page" to="new">New appointment</NavLink>
        </div>
    )
}

export default AllAppointmentsList;
