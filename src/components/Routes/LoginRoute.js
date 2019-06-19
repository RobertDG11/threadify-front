import React, { Component } from "react";
import { connect } from "react-redux";
import { modifyLoginForm } from "../redux/actions/actions";
import { Route } from "react-router-dom";

class ConnectedLoginRoute extends Component {
  componentDidMount() {
    const register = this.props.path === "/register" ? true : false;
    this.props.modifyLoginForm({
      open: true,
      register
    });
  }
  render() {
    const { component: Component, ...rest } = this.props;

    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modifyLoginForm: loginModal => dispatch(modifyLoginForm(loginModal))
  };
}

const mapStateToProps = state => {
  return {
    loginModal: state.showCarousel.loginModal
  };
};

const LoginRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedLoginRoute);

export default LoginRoute;
