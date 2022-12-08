import React from "react";

class SaleHistory extends React.Component{
    constructor() {
        super()
        this.state= {
            salespeople: [],
            salesperson: '',
            sales: '',
        }
        this.handleSalespersonChange = this.handleSalespersonChange.bind(this);
    }

    handleSalespersonChange(event) {
        const value = event.target.value;
        this.setState({salesperson: value})
        // function tbody() {
        //     render()
        //     for (let sale of this.state.sales) {
        //         if (sale.salesperson.name === this.state.salesperson.name) {
        //             render()
        //                 return(
        //                     <tr key={sale.automobile.vin}>
        //                         <td>{sale.salesperson.name}</td>
        //                         <td>{sale.customer.name}</td>
        //                         <td>{sale.automobile.vin}</td>
        //                         <td>{sale.price}</td>
        //                     </tr>
        //                 )
        //         }
        //     }}
        }


    async componentDidMount() {
        const salesUrl = 'http://localhost:8090/api/sales/'
        const salesResponse = await fetch(salesUrl);

        if (salesResponse.ok) {
            const data = await salesResponse.json();
            console.log("line41", data.sales, typeof data.sales)
            this.setState({sales: data.sales})
        }

        const salespersonUrl = 'http://localhost:8090/api/salespeople/'
        const salespersonResponse = await fetch(salespersonUrl);

        if (salespersonResponse.ok) {
            const data = await salespersonResponse.json();
            this.setState({salespeople: data.salespeople})
        }
    }



    render () {
        return (
            <div>
                <h1>Sales by Salesperson</h1>
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
                        {/* {tbody()} */}
                        {/* {this.state.sales.filter(sale => sale.salesperson.name === this.state.salesperson.name).map(filteredSale => {
                            return(
                                <tr key={filteredSale.automobile.vin}>
                                    <td>{filteredSale.salesperson.name}</td>
                                    <td>{filteredSale.customer.name}</td>
                                    <td>{filteredSale.automobile.vin}</td>
                                    <td>{filteredSale.price}</td>
                                </tr>
                            );
                        })} */}
                        {this.state.sales.map(sale => sale.filter(sale => sale.salesperson.name === this.state.salesperson.name).map(filteredSale => {
                            return(
                                <tr key={filteredSale.automobile.vin}>
                                    <td>{filteredSale.salesperson.name}</td>
                                    <td>{filteredSale.customer.name}</td>
                                    <td>{filteredSale.automobile.vin}</td>
                                    <td>{filteredSale.price}</td>
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SaleHistory;
