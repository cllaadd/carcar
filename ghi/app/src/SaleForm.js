import React from "react";

class SaleForm extends React.Component{
    constructor() {
        super()
        this.state= {
            automobile: '',
            automobiles: [],
            salespeople: [],
            salesperson: '',
            customers: [],
            customer: '',
            price: '',
        }
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalespersonChange = this.handleSalespersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data["price"] = data.price
        data["salesperson"] = data.salesperson
        delete data.automobiles
        delete data.customers
        delete data.salespeople

        const saleUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(saleUrl, fetchConfig);
        console.log(response)
        if (response.ok) {
            const newSale = await response.json();

            const cleared = {
                automobile: '',
                salesperson: '',
                customer: '',
                price: '',
            };
            this.setState(cleared);
        }
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({automobile: value})
    }

    handleSalespersonChange(event) {
        const value = event.target.value;
        this.setState({salesperson: value})
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({customer: value})
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({price: value})
    }

    async componentDidMount() {
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const automobileResponse = await fetch(automobileUrl);

        if (automobileResponse.ok) {
            const data = await automobileResponse.json();
            this.setState({automobiles: data.autos})
        }

        const salespersonUrl = 'http://localhost:8090/api/salespeople/'
        const salespersonResponse = await fetch(salespersonUrl);

        if (salespersonResponse.ok) {
            const data = await salespersonResponse.json();
            this.setState({salespeople: data.salespeople})
        }

        const customerUrl = 'http://localhost:8090/api/customers/'
        const customerResponse = await fetch(customerUrl);

        if (customerResponse.ok) {
            const data = await customerResponse.json();
            this.setState({customers: data.customers})
        }
    }


    render () {
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Record a new sale</h1>
                  <form onSubmit={this.handleSubmit} id="create-sale-form">
                  <div className="mb-3">
                      <select onChange={this.handleAutomobileChange} value={this.state.automobile} required id="automobile"  name="automobile" className="form-select" value={this.state.automobile}>
                      <option value="">Choose an automobile</option>
                          {this.state.automobiles?.map(automobile => {
                              return (
                                  <option key = {automobile.vin} value={automobile.vin}>
                                      {automobile.vin}
                                  </option>
                              )
                              })};
                      </select>
                    </div>
                    <div className="mb-3">
                      <select onChange={this.handleSalespersonChange} value={this.state.salesperson} required id="salesperson"  name="salesperson" className="form-select">
                      <option value="">Choose a salesperson</option>
                          {this.state.salespeople?.map(salesperson => {
                              return (
                                  <option key = {salesperson.employee_number} value={salesperson.employee_number}>
                                      {salesperson.name}
                                  </option>
                              )
                              })};
                      </select>
                    </div>
                    <div className="mb-3">
                      <select onChange={this.handleCustomerChange} value={this.state.customer} required id="customer"  name="customer" className="form-select">
                      <option value="">Choose a customer</option>
                          {this.state.customers?.map(customer => {
                              return (
                                  <option key = {customer.name} value={customer.name}>
                                      {customer.name}
                                  </option>
                              )
                              })};
                      </select>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handlePriceChange} value={this.state.price} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                      <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>
        );
    }
}

export default SaleForm
