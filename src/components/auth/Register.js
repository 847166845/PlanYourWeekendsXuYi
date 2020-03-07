import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import '../../css/toggle-switch.css'

class Register extends Component {
  state = {
    isBusinessUser: false,
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    const {username, isBusinessUser, password} = this.state;
    try {
        await Auth.signUp({
            username,
            password,
            attributes: this.getUserAttributes()
        });
        this.props.history.push({
          pathname: "/welcome",
          state: {isBusinessUser: isBusinessUser}
        });
    } catch (error) {
        let err = null;
        !error.message ? err = { "message": error } : err = error;
        this.setState({
          errors: {
            ...this.state.errors,
            cognito: err
          }
        });
    }
  };

  getUserAttributes = () => {
    if (!this.state.isBusinessUser) {
      return {
        email: this.state.email,
        "custom:userType": "normalUser"
      }
    } else {
      return {
        email: this.state.email,
        "custom:userType": "businessUser"
      }
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  onCheckboxChange = event => {
    this.setState({
      [event.target.id]: event.target.checked
    });
    document.getElementById("username").placeholder = event.target.checked ? "Enter company legal name" : "Enter username";
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Register</h1>
          <FormErrors formerrors={this.state.errors} />
          <form className="col-sm-12" onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-6 col-form-label" htmlFor="isBusinessUser">Business User: </label>
              <div className="onoffswitch">
                <input 
                  type="checkbox" 
                  name="onoffswitch" 
                  className="onoffswitch-checkbox" 
                  id="isBusinessUser"
                  onChange={this.onCheckboxChange}/>
                <label className="onoffswitch-label" htmlFor="isBusinessUser">
                  <span className="onoffswitch-inner"></span>
                  <span className="onoffswitch-switch"></span>
                </label>
              </div>
            </div>
            <div className="field">
              <p className="control">
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input 
                  className="input" 
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Register;