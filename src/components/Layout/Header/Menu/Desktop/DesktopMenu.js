import React, { Component } from "react";
import {
  Button,
  Container,
  Menu,
  MenuItem,
  Image,
  Dropdown,
  Flag
} from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../../../../Modals/Login/Login";

import {
  carouselVisible,
  modifyActiveItem,
  modifyLoginForm,
  deauthenticate,
  loadLiterals
} from "../../../../redux/actions/actions";
import loadLang from "../../../../../i18n/index";

import styles from "../Menu.module.scss";
import logo from "../../../../../images/threadify.png";
import Aux from "../../../../../hoc/aux";
import SearchExampleStandard from "../../../../Search/ProfessorsSearch";

class ConnectedDesktopMenu extends Component {
  handleItemClick = (e, { name }) => {
    this.props.modifyActiveItem(name);
    this.props.carouselVisible(true);
  };

  handleCarousel = (e, { name }) => {
    this.props.modifyActiveItem(name);
    this.props.carouselVisible(false);
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
    const { literals } = this.props;
    const options = [
      { key: 1, flag: "ro", value: "ro" },
      { key: 2, flag: "uk", value: "en" }
    ];
    const className = `${styles.FixedMenu} ${styles.CorrectBorder}`;
    return (
      <Menu
        className={className}
        fixed={this.props.fixed ? "top" : null}
        inverted={!this.props.fixed}
        pointing={!this.props.fixed}
        secondary={!this.props.fixed}
        size="large"
      >
        {!this.props.fixed ? (
          <Image
            src={logo}
            style={{ height: "5em", width: "5em", marginRight: "1em" }}
          />
        ) : null}

        <MenuItem
          as={NavLink}
          exact
          to="/"
          name="home"
          onClick={this.handleItemClick}
          className={styles.CenteredContent}
        >
          {literals.home}
        </MenuItem>
        <MenuItem
          as={NavLink}
          exact
          to="/front"
          name="home"
          onClick={this.handleItemClick}
          className={styles.CenteredContent}
        >
          Frontpage
        </MenuItem>
        {/* {this.hasPermission(1) ? (
          <MenuItem
            as={NavLink}
            to="/profesori"
            name="prof"
            onClick={this.handleCarousel}
            className={styles.CenteredContent}
          >
            {literals.prof}
          </MenuItem>
        ) : null} */}
        {/* {this.hasPermission(1) ? (
          <MenuItem
            as={NavLink}
            to="/rezerva-sala"
            name="classroom"
            onClick={this.handleCarousel}
            className={styles.CenteredContent}
          >
            {literals.book}
          </MenuItem>
        ) : null}
        {this.hasPermission(1) ? (
          <MenuItem
            as={NavLink}
            to="/formularul-zilei"
            name="form"
            onClick={this.handleCarousel}
            className={styles.CenteredContent}
          >
            {literals.form}
          </MenuItem>
        ) : null} */}

        <MenuItem position="right">
          {/* {this.hasPermission(1) ? (
            <SearchExampleStandard style={{ marginRight: "2em" }} />
          ) : null} */}
          <Dropdown
            onChange={this.handleChange}
            options={options}
            selection
            compact
          />
          <Container fluid>
            {!this.props.isAuth ? (
              <Aux>
                <Button
                  as={NavLink}
                  to="/login"
                  inverted={!this.props.fixed}
                  className={styles.LoginButton}
                >
                  {literals.login}
                </Button>
                <Button
                  as={NavLink}
                  to="/register"
                  inverted={!this.props.fixed}
                  primary={this.props.fixed}
                  className={styles.SignUpButton}
                >
                  {literals.register}
                </Button>
              </Aux>
            ) : (
              <Button
                as={NavLink}
                to="/"
                inverted={!this.props.fixed}
                primary={this.props.fixed}
                className={styles.LoginButton}
                onClick={this.handleLogout}
              >
                {literals.logout}
              </Button>
            )}

            <Login />
          </Container>
        </MenuItem>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    showCarousel: state.showCarousel.showCarousel,
    activeItem: state.showCarousel.activeItem,
    loginModal: state.showCarousel.loginModal,
    isAuth: state.auth.isAuth,
    userType: state.auth.user.authorities,
    literals: state.literals
  };
};

function mapDispatchToProps(dispatch) {
  return {
    carouselVisible: showCarousel => dispatch(carouselVisible(showCarousel)),
    modifyActiveItem: activeItem => dispatch(modifyActiveItem(activeItem)),
    modifyLoginForm: loginModal => dispatch(modifyLoginForm(loginModal)),
    deauthenticate: () => dispatch(deauthenticate()),
    loadLiterals: lang =>
      loadLang(lang).then(lang => dispatch(loadLiterals(lang)))
  };
}

const DesktopMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedDesktopMenu);

export default withRouter(DesktopMenu);
