import React, { Component, Fragment } from 'react';
import Event from '../Events';
import axios from "axios";
const config = require('../../config.json');

export default class BusinessAdmin extends Component {

  state = {
    newBusiness: { 
      "companyLegalName": "",
      "joinedTime": null,
      "websiteLink": null,
      "description": "",
      "userName": "",
      "password": "",
    },
    businesses: []
  }

  handleAddBusiness = async (event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      // const params = {
      //   "id": id,
      //   "productname": this.state.newproduct.productname
      // };
      // await axios.post(`${config.api.invokeUrl}/products/${id}`, params);
      this.setState({ businesses: [...this.state.businesses, this.state.newbusiness] });
    }catch (err) {
      console.log(`An error has occurred adding a business: ${err}`);
    }
  }

  handleUpdateBusiness = async (companyLegalName, name, description) => {
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "companyLegalName": "",
        "joinedTime": null,
        "websiteLink": null,
        "description": "",
        "userName": "",
        "password": "",
      };
      // await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);
      const businessToUpdate = [...this.state.businesses].find(business => business.companyLegalName === companyLegalName);
      const updatedBusinesses = [...this.state.businesses].filter(business => business.companyLegalName !== companyLegalName);
      updatedBusinesses.push(businessToUpdate);
      this.setState({businesses: updatedBusinesses});
    }catch (err) {
      console.log(`Error updating businesses: ${err}`);
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

  fetchBusinesses = async () => {
    // add call to AWS API Gateway to fetch businesses here
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
    this.fetchBusinesses();
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
                <form onSubmit={event => this.handleAddBusiness(event)}>
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
                          handleUpdateEvent={this.handleUpdateBusiness}
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
