import React from "react";

class ModelForm extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            name: '',
            pictureUrl: '',
            manufacturers: [],
        }
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.picture_url = data.pictureUrl
        delete data.pictureUrl;
        delete data.manufacturers;

        const modelUrl = `http://localhost:8100/api/models/`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
            const newModel = await response.json();
            console.log(newModel);

            const cleared = {
                name: '',
                pictureUrl: '',
                model: '',
            };
            this.setState(cleared);
        }
    }

    handleInputChange(event) {
        const value = event.target.value;
        this.setState({[event.target.id]: value})
    }

    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({pictureUrl: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers})
        }
    }

    render () {
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a vehicle model</h1>
                  <form onSubmit={this.handleSubmit} id="create-model-form">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleInputChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handlePictureUrlChange} value={this.state.pictureUrl} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control" />
                      <label htmlFor="picture_url">Picture URL</label>
                    </div>
                    <div className="mb-3">
                      <select onChange={this.handleInputChange} required id="manufacturer"  name="manufacturer" className="form-select">
                      <option value="">Choose a manufacturer</option>
                          {this.state.manufacturers?.map(manufacturer => {
                              return (
                                  <option key = {manufacturer.id} value={manufacturer.id}>
                                      {manufacturer.name}
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

export default ModelForm
