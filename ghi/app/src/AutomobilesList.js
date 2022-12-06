import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AutomobilesList() {
    const [automobiles, setAutomobiles] = useState([])

    const getData = async() => {
        const response = await fetch('http://localhost:8100/api/automobiles/')
        const data = await response.json()
        console.log(data)
        setAutomobiles(data.autos)
    }

    useEffect(()=> {
        getData();
    }, []
    )

    return (
        <div>
            <h1>Vehicle models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles?.map(automobile => {
                        return(
                            <tr key={automobile.vin}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.color}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.name}</td>
                                <td>{automobile.model.manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <NavLink className="btn btn-primary" id="new-automobile-link" aria-current="page" to="new-automobile">New Automobile</NavLink>
        </div>
    )
}

export default AutomobilesList;
