import React from "react";

class ManufacturerForm extends React.Component {
  state = {
    name: '',
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...this.state };

    const manufacturerUrl = `http://localhost:8100/api/manufacturers/`;
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      const newManufacturer = await response.json();

      const cleared = {
        name: '',
      };
      this.setState(cleared);
    }
  }

  handleInputChange = async (event) => {
    const value = event.target.value;
    this.setState({ [event.target.id]: value })
  }


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a manufacturer</h1>
            <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleInputChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ManufacturerForm
