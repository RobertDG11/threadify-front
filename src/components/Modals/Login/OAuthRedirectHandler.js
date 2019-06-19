import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getSession } from "../../redux/reducers/authReducer";
import { modifyLoginForm } from "../../redux/actions/actions";
import { AUTHENTICATE } from "../../redux/constants/index";

class ConnectedOAuth2RedirectHandler extends Component {
  getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(this.props.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  render() {
    const token = this.getUrlParameter("token");
    const error = this.getUrlParameter("error");

    if (token) {
      this.props.getSession();
      this.props.addToken(token);
      this.props.modifyLoginForm({
        open: false,
        register: this.props.loginModal.register
      });
      return (
        <Redirect
          to={{
            pathname: "/front",
            state: { from: this.props.location }
          }}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: this.props.location,
              error: error
            }
          }}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return { loginModal: state.showCarousel.loginModal };
};

function mapDispatchToProps(dispatch) {
  return {
    getSession: () => dispatch(getSession()),
    addToken: token => dispatch({ type: AUTHENTICATE, payload: token }),
    modifyLoginForm: loginModal => dispatch(modifyLoginForm(loginModal))
  };
}

const OAuth2RedirectHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedOAuth2RedirectHandler);

export default OAuth2RedirectHandler;
