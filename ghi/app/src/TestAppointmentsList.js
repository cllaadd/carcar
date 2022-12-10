import { useState, useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Appointment from "./Appointment";
import SearchVIN from "./SearchVIN";
import VIPBadge from "./VIPBadge";

function AppointmentsList() {
    const [appointments, setAppointments] = useState([])
    const [filterValue, setFilter] = useState("");


    const handleChange = (event) => {
        setFilter(event.target.value);
      };


    const getData = async() => {
        const response = await fetch('http://localhost:8080/api/appointments/filtered/')
        const data = await response.json()
        setAppointments(data.appointments)
    }


    const { search } = window.location;
    const query = new URLSearchParams(search).get('vs');
    const filteredAppointments = filteredAppointments(appointments, query);

    const filterVINs = (appointments, query) => {
        if (!query) {
            return appointments;
        }

        return appointments.filter((appointment) => {
            const appointmentVin = appointment.vin
            return appointmentVin === query
        });
    };


    // let filteredAppointments = [];
    // if (filterValue === "") {
    // filteredAppointments = appointments;
    // } else {
    // filteredAppointments = appointments.filter((appointment) =>
    //   appointment.vin === filterValue
    // );
    // }

    const VIPBadge = ({appointment}) => (
        <Badge bg={appointment.vip ? "info" : "light"}>{appointment.vin}</Badge>
    );

    // const getFilteredList = () => {
    //     return appointments.filter((appointment) => appointment[fieldInput].includes(filterInput));
    //   };


    const handleSubmit = (event) => {
        event.preventDefault();
        const input = filterValue
      };


    const handleDelete = async(id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/edit/${id}/`, {method:"DELETE"})
        const data = await response.json()
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
        getData();
        window.location = "/appointments"
    }

    useEffect(()=> {
        getData();
    }, []
    )



    return (
        <div>
            <div>
              <SearchVIN
                filterValue={filterValue}
                handleChange={handleChange}
              />
              <button className="btn btn-secondary m-2" onClick={()=> {handleSubmit(filterValue)}}>Search VIN</button>
            </div>
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
                    <tr>
                    <td>{VIPBadge}</td>
                    {appointments.map((appointment, id) => (
                        <Appointment key={id} {...appointment} />
                    )
                    )}
                    <td>
                                <button className="btn btn-success m-2" onClick={()=> {handleFinish(appointment.id)}}>Finish</button>
                                </td>
                                <td>
                                <button className="btn btn-danger m-2" onClick={()=> {handleDelete(appointment.id)}}>Cancel</button>
                                </td>
                    </tr>
                </tbody>
            </table>
            <NavLink className="btn btn-primary" id="new-appointment-link" aria-current="page" to="new">New appointment</NavLink>
        </div>
    )
}

export default AppointmentsList;
