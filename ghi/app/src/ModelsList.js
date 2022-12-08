import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ModelsList() {
    const [models, setModels] = useState([])

    const getData = async() => {
        const response = await fetch('http://localhost:8100/api/models/')
        const data = await response.json()
        setModels(data.models)
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
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models?.map(model => {
                        return(
                            <tr key={model.id}>
                                <td>{model.name}</td>
                                <td>{model.manufacturer.name}</td>
                                <td><img src={model.picture_url} className="img-fluid" /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <NavLink className="btn btn-primary" id="new-model-link" aria-current="page" to="new-model">New Model</NavLink>
        </div>
    )
}

export default ModelsList;
