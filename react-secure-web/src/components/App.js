import React, { Component } from "react";
import Authorized from "../wrappers/Authorized";
import Authorization from "../services/Authorization";
import "../styles/App.css";

const Auth = new Authorization();

class App extends Component {
  render() {
    return (
      <div>
        <p className="header">Welcome to the site {this.props.user.name}!</p>

        <div className="center">
          <button
            type="button"
            className="form-submit"
            onClick={this.handleLogout.bind(this)}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  handleLogout() {
    Auth.logout();
    this.props.history.replace("/login");
  }
}

export default Authorized(App);
