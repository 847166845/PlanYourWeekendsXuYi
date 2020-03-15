import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class EventsAdmin extends Component {

  state = {
    isEditMode: false,
    updatedEventName: this.props.name,
    updatedEventDescription: this.props.description,
  }

  handleProductEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateEvent(this.props.id, this.state.updatedEventName);
  }

  onEventNameChange = event => this.setState({ "updatedEventName": event.target.value });
  onEventDescriptionChange = event => this.setState({ "updatedEventDescription": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleProductEdit} className="event-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteEvent(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit event name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedEventName}
                onChange={this.onEventNameChange}
              />
              <p>Edit event description</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter description"
                value={this.state.updatedEventDescription}
                onChange={this.onEventDescriptionChange}
              />
              <p className="event-description">id: { this.props.description }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="event-name">Name: { this.props.name }</p>
              <p className="event-description">Description: { this.props.description }</p>
            </div>
        }
      </div>
    )
  }
}
