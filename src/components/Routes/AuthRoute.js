import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class ConnectedAuthRoute extends Component {
  hasPermission = userType => {
    if (this.props.isAuth) {
      console.log(this.props.userType);
      switch (userType) {
        case 0:
          return this.props.userType.length === 2;
        case 1:
          return true;
        default:
          return false;
      }
    }
    return false;
  };
  render() {
    let { component: Component, type, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          this.hasPermission(type) ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: "/front"
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    userType: state.auth.user.authorities
  };
};

const AuthRoute = connect(mapStateToProps)(ConnectedAuthRoute);

export default AuthRoute;
