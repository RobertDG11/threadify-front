import React, { Component } from "react";
import { Sidebar, MenuItem, Menu, Button, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import Login from "../../../../Modals/Login/Login";
import {
  carouselVisible,
  modifyActiveItem,
  modifyLoginForm,
  deauthenticate
} from "../../../../redux/actions/actions";
import Aux from "../../../../../hoc/aux";
import SearchExampleStandard from "../../../../Search/ProfessorsSearch";

import logo from "../../../../../images/logo2.png";

class ConnectedSidebarCustom extends Component {
  handleItemClick = (e, { name }) => {
    this.props.modifyActiveItem(name);
    this.props.carouselVisible(true);
  };

  handleLogout = () => {
    this.props.deauthenticate();
  };

  handleChange = (e, { value }) => {
    this.props.loadLiterals(value);
  };

  hasPermission = userType => {
    if (this.props.isAuth) {
      switch (userType) {
        case 0:
          return this.props.userType === userType;
        case 1:
          return true;
        case 2:
          return this.props.userType === userType || this.props.userType === 0;
        default:
          return false;
      }
    }
    return false;
  };

  render() {
    const { literals } = this.props;
    return (
      <Sidebar
        as={Menu}
        animation="push"
        inverted
        color="blue"
        onHide={this.props.handleSidebarHide}
        vertical
        visible={this.props.sidebarOpened}
      >
        <Image
          src={logo}
          size="small"
          centered
          style={{ paddingTop: "1.5em" }}
        />
        {!this.props.isAuth ? (
          <Aux>
            <MenuItem as={NavLink} to="/login" name="login">
              {literals.login}
            </MenuItem>
            <MenuItem as={NavLink} to="/register" name="register">
              {literals.register}
            </MenuItem>
          </Aux>
        ) : (
          <MenuItem
            as={NavLink}
            to="/"
            name="logout"
            onClick={this.handleLogout}
          >
            {literals.logout}
          </MenuItem>
        )}
        <Login />
        <MenuItem>
          {this.hasPermission(1) ? (
            <SearchExampleStandard style={{ marginRight: "2em" }} />
          ) : null}
        </MenuItem>
        <MenuItem
          as={NavLink}
          exact
          to="/"
          name="home"
          onClick={this.handleItemClick}
        >
          {literals.home}
        </MenuItem>
        {this.hasPermission(1) ? (
          <MenuItem as={NavLink} to="/profesori" name="prof">
            {literals.prof}
          </MenuItem>
        ) : null}
        {this.hasPermission(1) ? (
          <MenuItem as={NavLink} to="/rezerva-sala" name="classroom">
            {literals.book}
          </MenuItem>
        ) : null}
        {this.hasPermission(1) ? (
          <MenuItem as={NavLink} to="/formularul-zilei" name="form">
            {literals.form}
          </MenuItem>
        ) : null}
      </Sidebar>
    );
  }
}

const mapStateToProps = state => {
  return {
    showCarousel: state.showCarousel.showCarousel,
    activeItem: state.showCarousel.activeItem,
    loginModal: state.showCarousel.loginModal,
    isAuth: state.auth.isAuth,
    userType: state.auth.user.user_type,
    literals: state.literals
  };
};

function mapDispatchToProps(dispatch) {
  return {
    carouselVisible: showCarousel => dispatch(carouselVisible(showCarousel)),
    modifyActiveItem: activeItem => dispatch(modifyActiveItem(activeItem)),
    modifyLoginForm: loginModal => dispatch(modifyLoginForm(loginModal)),
    deauthenticate: () => dispatch(deauthenticate())
  };
}

const SidebarCustom = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSidebarCustom);

export default SidebarCustom;
