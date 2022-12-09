import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function TestAppointmentsList() {
    const [appointments, setAppointments] = useState([])


    const getData = async() => {
        const response = await fetch('http://localhost:8080/api/appointments/')
        const data = await response.json()
        setAppointments(data.appointments)
    }

    const finishAppointment = async(id) => {
        const finished = "{finished : True}"
        const fetchConfig = {
                method: 'put',
                body: JSON.stringify(finished),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
        const appointmentsResponse = await fetch(`http://localhost:8080/api/appointments/${id}/`, fetchConfig)

        if (appointmentsResponse.ok) {
            const data = await appointmentsResponse.json();
            this.setState({"appointments": data.appointments})
        }

    const componentDidUpdate = async(id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/`, {method:"DELETE"})
        const data = await response.json()
        console.log(data)
        getData();
        window.location = "/appointments"
    }

    // const handleFinish = async(id) => {
    //     const response = await fetch(`http://localhost:8080/api/appointments/${id}/`, {method:"PUT"})
    //     const data = await response.json();
    //     console.log(data)
    //     getData();
    //     window.location = "/appointments"
    // }

    // const searchVIN = async(vin) => {
    //     const response = await fetch(`http://localhost:8080/api/appointments/${vin}/`, {method:"GET"})
    //     const data = await response.json();
    //     console.log(data)
    //     getData();
    //     window.location = "/appointments"
    // }

    useEffect(()=> {
        getData();
    }, []
    )

}

    return (
        <div>
            <div className="mb-3">
                <input placeholder="Car VIN" required type="text" name="vin" id="vin" className="form-control" />
                <button className="btn btn-outline-secondary" onSubmit= {searchVIN}>Search</button>
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
                                <button className="btn btn-success m-2" onClick={()=> {finishAppointment(appointment.id)}}>Finish</button>
                                </td>
                                <td>
                                <button className="btn btn-danger m-2" onClick={()=> {componentDidUpdate(appointment.id)}}>Cancel</button>
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

export default TestAppointmentsList;
