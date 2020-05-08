import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Business extends Component {

  state = {
    name: this.props.name,
    description: this.props.description
  }

  render() {
    return (
      <div>
        <div>
          Name: {this.state.name}
        </div>
        <div>
          Description: {this.state.description}
        </div>
      </div>
    )
  }
}
