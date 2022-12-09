import React from "react";

class AppointmentVIPs extends React.Component {
    state = {vin: '',}

    handleVINChange = async(event) => {
            const value = event.target.value;
            this.setState({vin: value})
            }

    componentDidUpdate = async(prevProps,prevState) => {
        if (prevState.vin !== this.state.vin){
            const vin = this.state.vin
            const url = `http://localhost:8090/api/appointments/${vin}`
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                this.setState({appointments: data.appointments})
            }
        }
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        const data = {...this.state};
        console.log(data)


        const appointmentUrl = `http://localhost:8080/api/appointments/`;
        const fetchConfig = {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();
            console.log(newAppointment);

            const cleared = {
              vin: '',
            };
            this.setState(cleared);
        }
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({[event.target.id]: value})
    }


    componentDidMount = async() => {
        const autosUrl = 'http://localhost:8080/api/autovos/'
        const autosResponse = await fetch(autosUrl);

        if (autosResponse.ok) {
            const data = await autosResponse.json();
            this.setState({autos: data.autos})
        }

        const appointmentsUrl = 'http://localhost:8080/api/appointments/filtered/'
        const appointmentsResponse = await fetch(appointmentsUrl);

        if (appointmentsResponse.ok) {
            const data = await appointmentResponse.json();
            this.setState({appointments: data.appointments})
        }
    }


    render () {
        return(
        <div className="container">
        <input
          type="search"
          value={vin}
          onChange={filter}
          className="input"
          placeholder="Search VIN"
        />
        <div>
            <div>
                <input onChange={this.handleInputChange} value={this.state.vin} placeholder="Search Vin" required type="text" name="vin" id="vin" className="form-control" />
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
                    </tr>
                </thead>
                <tbody>
                {this.state.appointments?.map(appointment => {
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
            <NavLink className="btn btn-primary" id="new-appointment-link" aria-current="page" to="new-appointment">New appointment</NavLink>
        </div>
    </div>
        )
    }
}

export default AppointmentVIPs;
