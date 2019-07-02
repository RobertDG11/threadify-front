import React, { Component } from "react";
import {
  Button,
  Header,
  Modal,
  Icon,
  Segment,
  Divider,
  Grid,
  TransitionablePortal
} from "semantic-ui-react";
import WindowSize from "../../../hoc/WindowSize";
import LoginForm from "../../Forms/LoginForm";
import RegisterForm from "../../Forms/RegisterForm";
import styles from "./Login.module.scss";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { modifyLoginForm } from "../../redux/actions/actions";
import { toast } from "react-toastify";

class ConnectedThread extends Component {
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.error) {
      setTimeout(() => {
        toast.error(this.props.location.state.error, {
          timeout: 5000
        });
        this.props.history.replace({
          pathname: this.props.location.pathname,
          state: {}
        });
      }, 100);
    }
  }
  changePath = () => {
    this.props.history.goBack();
    this.props.modifyLoginForm({
      open: false,
      register: this.props.loginModal.register
    });
  };

  changeForm = () => {
    this.props.modifyLoginForm({
      open: this.props.loginModal.open,
      register: !this.props.loginModal.register
    });
  };

  onMount = () => {
    document
      .getElementsByClassName("dimmer")[0]
      .classList.add(styles.DimmerBackground);
  };

  render() {
    const mobile = this.props.windowWidth < 768;
    const { open, register } = this.props.loginModal;
    return (
      <Modal
        open={true}
        onClose={this.changePath}
        centered
        size="small"
        dimmer
        closeIcon
      >
        <Modal.Content scrolling>
          <Modal.Description>
            <Segment placeholder>
              <Grid columns={2} relaxed="very" stackable verticalAlign="middle">
                <Grid.Column>
                  {register ? <RegisterForm /> : <LoginForm />}
                </Grid.Column>

                <Grid.Column verticalAlign="middle">
                  {mobile ? <Divider horizontal>Sau</Divider> : null}
                  <Segment
                    style={{
                      backgroundColor: "transparent",
                      border: "0px",
                      boxShadow: "0 0 0 0"
                    }}
                  >
                    <Button
                      as={Link}
                      to={register ? "/login" : "/register"}
                      animated
                      size="big"
                      onClick={this.changeForm}
                    >
                      <Button.Content visible>
                        {register ? "Log in" : "Cont nou"}
                      </Button.Content>
                      <Button.Content hidden>
                        <Icon name={register ? "sign-in" : "signup"} />
                      </Button.Content>
                    </Button>
                  </Segment>

                  {register ? (
                    <Segment
                      style={{
                        backgroundColor: "transparent",
                        border: "0px",
                        boxShadow: "0 0 0 0"
                      }}
                    >
                      <Button
                        basic
                        style={{
                          backgroundColor: "transparent",
                          border: "0px",
                          boxShadow: "0 0 0 0",
                          padding: "0px"
                        }}
                      >
                        <a href="">
                          <Header
                            style={{ paddingTop: "1px" }}
                            as="h5"
                            icon="question circle outline"
                            content="Am uitat parola"
                            textAlign="center"
                          />
                        </a>
                      </Button>
                    </Segment>
                  ) : null}
                </Grid.Column>
              </Grid>

              {!mobile ? <Divider vertical>Or</Divider> : null}
            </Segment>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginModal: state.showCarousel.loginModal
  };
};

function mapDispatchToProps(dispatch) {
  return {
    modifyLoginForm: loginModal => dispatch(modifyLoginForm(loginModal))
  };
}

const Thread = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedThread);

export default WindowSize(withRouter(Thread));
