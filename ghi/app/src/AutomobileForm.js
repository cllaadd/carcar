import React from "react";

class AutomobileForm extends React.Component {
  state = {
    color: '',
    year: '',
    vin: '',
    model: '',
    models: [],
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...this.state };
    data["model_id"] = data.model;
    data["year"] = data.year;
    delete data.models;

    const automobileUrl = `http://localhost:8100/api/automobiles/`;
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(automobileUrl, fetchConfig);
    if (response.ok) {
      const newAutomobile = await response.json();

      const cleared = {
        color: '',
        year: '',
        vin: '',
        model: '',
        models: [],
      };
      this.setState(cleared);
    }
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({ [event.target.id]: value })
  }

  componentDidMount = async () => {
    const url = 'http://localhost:8100/api/models/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ models: data.models })
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add an automobile to inventory</h1>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleInputChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleInputChange} value={this.state.year} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleInputChange} value={this.state.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleInputChange} value={this.state.model} required id="model" name="model" className="form-select">
                  <option value="">Choose a model</option>
                  {this.state.models?.map(model => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.name}
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

export default AutomobileForm
