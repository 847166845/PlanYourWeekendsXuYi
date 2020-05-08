import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BusinessAdmin from './components/admin/BusinessAdmin';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import Footer from './components/Footer';
import UserProfile from './components/user/UserProfile';
import { Auth } from 'aws-amplify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
library.add(faEdit);

class App extends Component {

  /* Set global state here, and bundle it to all the components. Note here this global state needs 
  to be persisted by leveraging local storage - and luckily aws Amplify automaticallyhandles this for us
  */
  state = {
    isAuthenticated: false,
    isAuthenticating: true, // important for flagging the authenticating status 
    cognitoUser: null,
    userType: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated});
  }

  setCognitoUser = cognitoUser => {
    this.setState({ cognitoUser: cognitoUser});
  }

  setUserType = cognitoUser => {
    const groups = cognitoUser.signInUserSession.idToken.payload["cognito:groups"];
    const admin = groups && groups[0]
    console.log(admin || cognitoUser.attributes["custom:userType"]);
    this.setState({ userType: admin || cognitoUser.attributes["custom:userType"] });
  }

  async componentDidMount() {
    // enabling debugging mode
    // window.LOG_LEVEL = 'DEBUG';

    try {
      this.setState({ isAuthenticating: true });
      // retrieves session token from local storage
      const session = await Auth.currentSession();
      console.log(session);
      const cognitoUser = await Auth.currentAuthenticatedUser();
      this.setCognitoUser(cognitoUser);
      this.setAuthStatus(true);
      console.log(cognitoUser);
      this.setUserType(cognitoUser);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      cognitoUser: this.state.cognitoUser,
      userType: this.state.userType,
      setAuthStatus: this.setAuthStatus,
      setCognitoUser: this.setCognitoUser
    }
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps}/>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} auth={authProps} />} />
              <Route exact path="/businessadmin" render={props => <BusinessAdmin {...props} auth={authProps} />} />
              <Route exact path="/login" render={props => <LogIn {...props} auth={authProps} />} />
              <Route exact path="/register" render={props => <Register {...props} auth={authProps} />} />
              <Route exact path="/forgotpassword" render={props => <ForgotPassword {...props} auth={authProps} />} />
              <Route exact path="/forgotpasswordverification" render={props => <ForgotPasswordVerification {...props} auth={authProps} />} />
              <Route exact path="/userprofile" render={props => <UserProfile {...props} auth={authProps} />} />
              <Route exact path="/changepassword" render={props => <ChangePassword {...props} auth={authProps} />} />
              <Route exact path="/changepasswordconfirmation" render={props => <ChangePasswordConfirm {...props} auth={authProps} />} />
              <Route exact path="/welcome" render={props => <Welcome {...props} auth={authProps} />} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;