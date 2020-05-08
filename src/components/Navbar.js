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
          </div>

          
          {!this.props.auth.isAuthenticated && (
            <div className="navbar-end">
              <a href="/login" className="navbar-item">
                SignIn
              </a>
              <a href="/register" className="navbar-item">
                Register
              </a>
            </div>
          )}
          {this.props.auth.isAuthenticated && (
            <div className="navbar-end">
              <div className="btn-group">
                <a href="/userprofile" type="button" className="navbar-item dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span>Account & Profiles</span>
                  <span className="sr-only">Toggle Dropdown</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="/changepassword">Change password</a>
                  <a className="dropdown-item" href="/forgotpassword">Forgot password</a>
                  <div className="dropdown-divider"></div>
                  {/*this.props.auth.userType === "Admin" && <a className="dropdown-item" href="/admin/businessadmin">Business Admin</a>*/}
                  <a className="dropdown-item" href="/businessadmin">Business Admin</a>
                  <a className="dropdown-item" href="/" onClick={this.handleLogOut} >Sign out</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    )
  }
}
