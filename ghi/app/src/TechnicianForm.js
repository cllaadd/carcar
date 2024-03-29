import React from "react";

class TechnicianForm extends React.Component {
  state = {
    name: '',
    employeeNumber: ''
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...this.state };
    data["id"] = data.employeeNumber
    delete data.employeeNumber

    const technicianUrl = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(technicianUrl, fetchConfig);
    if (response.ok) {
      const newTechnician = await response.json();

      const cleared = {
        name: '',
        employeeNumber: '',
      };
      this.setState(cleared);
    }
  }

  handleNameChange = (event) => {
    const value = event.target.value;
    this.setState({ name: value })
  }

  handleEmployeeNumberChange = (event) => {
    const value = event.target.value;
    this.setState({ employeeNumber: value })
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Technician</h1>
            <form onSubmit={this.handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleEmployeeNumberChange} value={this.state.employeeNumber} placeholder="Employee Number" required type="number" name="employee_number" id="employee_number" className="form-control" />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TechnicianForm;
