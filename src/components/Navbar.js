import React, { Component } from 'react'
import { Auth } from "aws-amplify";

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      window.location.href = '/'; // to be replaced by props.history
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="event-master-logo.png" width="112" height="28" alt="event-master logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/events" className="navbar-item">
              Events
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <div>
                    <div className="btn-group button is-light">
                      <a href="/userprofile" type="button" className="btn is-light">Profile</a>
                      <button type="button" className="btn is-light dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only">Toggle Dropdown</span>
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="/changepassword">Change password</a>
                        <a className="dropdown-item" href="/forgotpassword">Forgot password</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">TODO</a>
                      </div>
                    </div>
                    <a href="/" onClick={this.handleLogOut} className="button is-light">
                      Log out
                    </a>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
