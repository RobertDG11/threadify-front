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
import WindowSize from "../../hoc/WindowSize";
import ThreadForm from "../Forms/ThreadForm";
//import styles from "./Login.module.scss";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { modifyLoginForm } from "../redux/actions/actions";
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
    this.props.modifyModalOpen();
  };

  changeForm = () => {
    this.props.modifyLoginForm({
      open: this.props.loginModal.open,
      register: !this.props.loginModal.register
    });
  };

  render() {
    const mobile = this.props.windowWidth < 768;
    const { open, register } = this.props.loginModal;
    return (
      <Modal
        open={this.props.threads.openModal}
        onClose={this.changePath}
        centered
        size="small"
        dimmer
        closeIcon
      >
        <Modal.Content scrolling>
          <Modal.Description>
            <Segment placeholder>
              <ThreadForm />
            </Segment>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginModal: state.showCarousel.loginModal,
    threads: state.threads
  };
};

function mapDispatchToProps(dispatch) {
  return {
    modifyModalOpen: () => dispatch({ type: "CREATE_THREAD" })
  };
}

const Thread = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedThread);

export default WindowSize(withRouter(Thread));
