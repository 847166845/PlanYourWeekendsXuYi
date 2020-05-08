import React, { Component, Fragment } from 'react';
import axios from "axios";
import Business from '../Business';
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
    try {
      // TODO: call backend api to add the business
      const emptyNewBusiness = { 
        "companyLegalName": "",
        "joinedTime": null,
        "websiteLink": null,
        "description": "",
        "userName": "",
        "password": "",
      };
      this.setState({ businesses: [...this.state.businesses, this.state.newBusiness], newBusiness: emptyNewBusiness });
    }catch (err) {
      console.log(`An error has occurred adding a business: ${err}`);
    }
  }

  fetchEvents = async () => {
    try {
      // add call to AWS API Gateway to fetch events here
      // then set them in state
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  fetchBusinesses = async () => {
    try {
      // add call to AWS API Gateway to fetch businesses here
      // then set them in state
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onNewBusinessChange = event => {
    this.setState({newBusiness: {...this.state.newBusiness, [event.target.name]: event.target.value }});
  }

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
            <p className="subtitle is-5">Create, update and remove a business</p>
            <br />
            <div className="rows">
              <div>
                <form onSubmit={event => this.handleAddBusiness(event)}>
                  <div className="control">
                    <input 
                      name="companyLegalName"
                      className="input is-medium"
                      type="text" 
                      placeholder="Enter name"
                      value={this.state.newBusiness.companyLegalName}
                      onChange={this.onNewBusinessChange}
                    />
                  </div>
                  <div className="control">
                    <input 
                      name="description"
                      className="input is-medium"
                      type="text" 
                      placeholder="Enter description"
                      value={this.state.newBusiness.description}
                      onChange={this.onNewBusinessChange}
                    />
                  </div>
                  <div className="control">
                    <button type="submit" className="button is-primary is-medium">
                      Add business
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <div>Existing businesses: </div>
                <div>
                  { 
                    this.state.businesses.map((business, index) => 
                      <Business
                        name={business.companyLegalName}
                        description={business.description}
                        key={index}
                      />
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
