import React from "react";

class AppointmentForm extends React.Component {
    state= {
        owner: '',
        vin: '',
        date: '',
        time: '',
        reason: '',
        technician: '',
        technicians: [],
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        const data = {...this.state};
        delete data.technicians;

        const appointmentUrl = `http://localhost:8080/api/appointments/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(appointmentUrl, fetchConfig);
        if (response.ok) {
            const newAppointment = await response.json();

            const cleared = {
              owner: '',
              vin: '',
              date: '',
              time: '',
              reason: '',
              technician: '',
              technicians: [],
            };
            this.setState(cleared);
        }
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({[event.target.id]: value})
    }

    handleTechnicianChange = (event) => {
      const value = event.target.value;
      this.setState({technician: value})
    }


    componentDidMount = async() => {
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({technicians: data.technicians})
        }
    }

    render () {
        return (
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Add an appointment</h1>
                <form onSubmit={this.handleSubmit} id="create-automobile-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.owner} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" />
                    <label htmlFor="owner">Owner</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                    <label htmlFor="vin">VIN</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.date} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                    <label htmlFor="date">Date</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                    <label htmlFor="time">Time</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleInputChange} value={this.state.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                    <label htmlFor="reason">Reason</label>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleTechnicianChange} required id="technician"  name="technician" className="form-select" value={this.state.technician}>
                    <option value="">Choose a technician</option>
                        {this.state.technicians?.map(technician => {
                            return (
                                <option key = {technician.id} value={technician.id}>
                                    {technician.name}
                                </option>
                            )
                        })};
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default AppointmentForm;
