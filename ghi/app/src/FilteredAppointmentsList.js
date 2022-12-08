import { useState, useEffect } from "react";

function AppointmentsList() {
    const [appointments, setAppointments] = useState([])

    const getData = async() => {
        const response = await fetch('http://localhost:8080/api/appointments/')
        const data = await response.json()
        console.log(data)
        setAppointments(data.appointments)
    }

    const [filteredAppointments, setFilteredAppointments] = useState(appointments);
    const filter = (e) => {
        const key = e.target.value;

        if (key !== '') {
            const results = appointments.filter((appointment) => {
              return appointment.vin.toLowerCase().startsWith(key.toLowerCase());
              //Make's the VIN case-insensitive
            });
            setFilteredAppointments(results);
          } else {
            setFilteredAppointments(appointments);
            // If empty, show all the appointments
          }

          setAppointments(key);
        };

    useEffect(()=> {
        getData();
    }, []
    )

    return (
        <div className="container">
        <input
          type="search"
          value={vin}
          onChange={filter}
          className="input"
          placeholder="Search VIN"
        />
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
                {filteredAppointments && filteredAppointments.length > 0 ?
                    (filteredAppointments?.map(appointment => {
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
                        }   )) : (
                        <h1>No results found!</h1>
                        )}
                </tbody>
            </table>
            {/* <NavLink className="btn btn-primary" id="new-appointment-link" aria-current="page" to="new-appointment">New appointment</NavLink> */}
        </div>
    </div>
    )
}

export default AppointmentsList;
