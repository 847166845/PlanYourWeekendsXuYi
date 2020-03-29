import React, { Component, Fragment } from 'react';
import Event from '../Events';
import axios from "axios";
const config = require('../../config.json');

export default class BusinessEventsAdmin extends Component {

  state = {
    newEvent: { 
      "name": "", 
      "description": "",
      "price": null,
      "startTime": null,
      "endTime": null,
      "bookingLink": null
    },
    events: []
  }

  handleAddEvent = async (event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      // const params = {
      //   "id": id,
      //   "productname": this.state.newproduct.productname
      // };
      // await axios.post(`${config.api.invokeUrl}/products/${id}`, params);
      this.setState({ events: [...this.state.events, this.state.newEvent] });
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateEvent = async (id, name, description) => {
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "id": id,
        "eventName": name,
        "description": description
      };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);
      const productToUpdate = [...this.state.products].find(product => product.id === id);
      const updatedProducts = [...this.state.products].filter(product => product.id !== id);
      productToUpdate.productname = name;
      updatedProducts.push(productToUpdate);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }

  handleDeleteEvent = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedProducts = [...this.state.products].filter(product => product.id !== id);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }

  fetchEvents = async () => {
    // add call to AWS API Gateway to fetch events here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddEventNameChange = event => this.setState({ newEvent: { ...this.state.newEvent, "name": event.target.value } });
  onAddEventDescriptionChange = event => this.setState({ newEvent: { ...this.state.newEvent, "description": event.target.value } });

  componentDidMount = () => {
    this.fetchEvents();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Business Admin</h1>
            <p className="subtitle is-5">Add and remove Events for a business using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddEvent(event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter name"
                        value={this.state.newEvent.name}
                        onChange={this.onAddEventNameChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter description"
                        value={this.state.newEvent.description}
                        onChange={this.onAddEventDescriptionChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add event
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.events.map((event, index) => 
                        <Event 
                          isAdmin={this.props.auth.userType === 'Admin'}
                          handleUpdateEvent={this.handleUpdateEvent}
                          handleDeleteEvent={this.handleDeleteEvent} 
                          name={event.name}
                          description={event.description}
                          key={event.name}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
