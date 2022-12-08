import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ManufacturersList() {
    const [manufacturers, setManufacturers] = useState([])

    const getData = async() => {
        const response = await fetch('http://localhost:8100/api/manufacturers/')
        const data = await response.json()
        setManufacturers(data.manufacturers)
    }

    useEffect(()=> {
        getData();
    }, []
    )

    return (
        <div>
            <h1>Manufacturers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers?.map(manufacturer => {
                        return(
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <NavLink className="btn btn-primary" id="new-manufacturer-link" aria-current="page" to="new-manufacturer">New Manufacturer</NavLink>
        </div>
    )
}

export default ManufacturersList
