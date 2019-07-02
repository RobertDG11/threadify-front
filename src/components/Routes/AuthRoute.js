import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class ConnectedAuthRoute extends Component {
  componentWillMount = () => {
    if (!this.props.isAuth) {
      this.props.modifyOpenModal();
    }
  };
  hasPermission = userType => {
    if (this.props.isAuth) {
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
          this.props.isAuth ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: "/login"
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

function mapDispatchToProps(dispatch) {
  return {
    modifyOpenModal: () => dispatch({ type: "CREATE_THREAD" })
  };
}

const AuthRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedAuthRoute);

export default AuthRoute;
