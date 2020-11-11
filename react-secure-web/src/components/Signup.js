import React, { Component } from "react";
import Authorization from "../services/Authorization";
import "../styles/Login.css";

class Signup extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authorization = new Authorization();

    this.state = {
      recentError: null,
    };
  }

  componentDidMount() {
    if (this.authorization.loggedIn()) this.props.history.replace("/");
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Sign Up</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="form-item"
              placeholder="Desired Username"
              name="username"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Desired Password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Confirm Password"
              name="password2"
              type="password"
              onChange={this.handleChange}
            />
            <h3 className="error">{this.state.recentError}</h3>
            <input className="form-submit" value="SUBMIT" type="submit" />
          </form>
        </div>
      </div>
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ recentError: null });

    if (this.state.password != this.state.password2) {
      this.setState({ recentError: "Passwords do not match!" });
      return;
    }

    this.authorization
      .signup(this.state.username, this.state.password)
      .then((_) => {
        this.props.history.replace("/login");
      })
      .catch((err) => {
        err.response.json().then((json) => {
          this.setState({ recentError: json.error });
        });
      });
  }
}

export default Signup;
