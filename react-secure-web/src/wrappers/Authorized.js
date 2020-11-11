import React, { Component } from "react";
import Authorization from "../services/Authorization";

export default function withAuth(Wrapped) {
  const authorization = new Authorization();

  return class AuthWrapped extends Component {

    constructor() {
      super();
      this.authorization = authorization;
      this.state = {
        user: null,
      };
    }

    componentDidMount() {
      if (!authorization.loggedIn()) {
        this.props.history.replace("/login");
      } else {
        try {
          const profile = authorization.getProfile();
          this.setState({
            user: profile,
          });
        } catch (err) {
          authorization.logout();
          this.props.history.replace("/login");
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <Wrapped history={this.props.history} user={this.state.user} />
        );
      } else {
        return null;
      }
    }
  };
}
