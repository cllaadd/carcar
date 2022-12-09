import { useState, useEffect } from "react";

function SaleList() {
    const [sales, setSales] = useState([])

    const getData = async() => {
        const response = await fetch('http://localhost:8090/api/sales/')
        const data = await response.json()
        setSales(data.sales)
    }

    useEffect(()=> {
        getData();
    }, []
    )

    return (
        <div>
            <h1>All sales</h1>
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
                    {sales?.map(sale => {
                        return(
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

export default SaleList;
