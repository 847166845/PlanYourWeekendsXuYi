import React, { Component } from 'react';

export default class Welcome extends Component {
  messageForBusinessUser = () => {
    console.log(this.props);
    if (this.props.location.state.isBusinessUser) {
      return (
        <p>Your account will be reviewed by our site admin. Once approved, you will be able to create events.</p>
        )
    }
    return <p></p>
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Welcome!</h1>
          <p>You have successfully registered a new account.</p>
          <p>We've sent you an email. Please click on the confirmation link to verify your account.</p>
          {this.messageForBusinessUser()}
        </div>
      </section>
    )
  }
}
