import React from "react";

class SaleHistory extends React.Component {
    state = {
        salespeople: [],
        salesperson: '',
        sales: [],
    }

    handleSalespersonChange = async (event) => {
        const value = event.target.value;
        this.setState({ salesperson: value })
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevState.salesperson !== this.state.salesperson) {
            const salesperson = this.state.salesperson
            const url = `http://localhost:8090/api/sales/${salesperson}`
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                this.setState({ sales: data.sales })
            }
        }
    }


    componentDidMount = async () => {
        const salesUrl = 'http://localhost:8090/api/sales/'
        const salesResponse = await fetch(salesUrl);

        if (salesResponse.ok) {
            const data = await salesResponse.json();
            this.setState({ sales: data.sales })
        }

        const salespersonUrl = 'http://localhost:8090/api/salespeople/'
        const salespersonResponse = await fetch(salespersonUrl);

        if (salespersonResponse.ok) {
            const data = await salespersonResponse.json();
            this.setState({ salespeople: data.salespeople })
        }
    }



    render() {
        return (
            <div>
                <h1>Sales by Salesperson</h1>
                <div className="mb-3">
                    <select onChange={this.handleSalespersonChange} value={this.state.salesperson} required id="salesperson" name="salesperson" className="form-select">
                        <option value="">Choose a salesperson</option>
                        {this.state.salespeople?.map(salesperson => {
                            return (
                                <option key={salesperson.employee_number} value={salesperson.employee_number}>
                                    {salesperson.name}
                                </option>
                            )
                        })};
                    </select>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Purchaser</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map(sale => {
                            return (
                                <tr key={sale.automobile.vin}>
                                    <td>{sale.salesperson.name}</td>
                                    <td>{sale.customer.name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SaleHistory;
