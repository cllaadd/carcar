import React from "react";

class CustomerForm extends React.Component {
  state = {
    name: '',
    address: '',
    phone: '',
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...this.state };

    const customerUrl = 'http://localhost:8090/api/customers/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();

      const cleared = {
        name: '',
        address: '',
        phone: '',
      };
      this.setState(cleared);
    }
  }

  handleNameChange = (event) => {
    const value = event.target.value;
    this.setState({ name: value })
  }

  handleAddressChange = (event) => {
    const value = event.target.value;
    this.setState({ address: value })
  }

  handlePhoneChange = (event) => {
    const value = event.target.value;
    this.setState({ phone: value })
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Customer</h1>
            <form onSubmit={this.handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleAddressChange} value={this.state.address} placeholder="123 Broadway St." required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handlePhoneChange} value={this.state.phone} placeholder="1234567890" required type="text" name="phone" id="phone" className="form-control" />
                <label htmlFor="phone">Phone Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerForm
