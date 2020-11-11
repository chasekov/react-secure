import React, { Component } from "react";
import Authorization from "../services/Authorization";
import "../styles/Login.css";

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
          <h1>Login</h1>
          <form onSubmit={this.handleFormSubmit}>
            <input
              className="form-item"
              placeholder="Username goes here..."
              name="username"
              type="text"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <h3 className="error">{this.state.recentError}</h3>
            <input className="form-submit" value="SUBMIT" type="submit" />

            <button
              type="button"
              className="register-submit"
              onClick={this.handleSignup.bind(this)}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    );
  }

  handleSignup(e) {
    this.props.history.replace("/signup");
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({ recentError: null });

    this.authorization
      .login(this.state.username, this.state.password)
      .then((_) => {
        this.props.history.replace("/");
      })
      .catch((err) => {
        err.response.json().then((json) => {
          this.setState({ recentError: json.error });
        });
      });
  }
}

export default Login;
