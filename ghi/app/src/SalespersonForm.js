import React from "react";

class SalespersonForm extends React.Component {
    state = {
        name: '',
        employeeNumber: ''
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        const data = {...this.state};
        data["employee_number"] = data.employeeNumber
        delete data.employeeNumber

        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();

            const cleared = {
                name: '',
                employeeNumber: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange = (event) => {
        const value = event.target.value;
        this.setState({name: value})
    }

    handleEmployeeNumberChange = (event) => {
        const value = event.target.value;
        this.setState({employeeNumber: value})
    }

    render () {
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Salesperson</h1>
                  <form onSubmit={this.handleSubmit} id="create-salesperson-form">
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

export default SalespersonForm
