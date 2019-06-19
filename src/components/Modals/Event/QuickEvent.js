import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import Aux from "../../../hoc/aux";
import NewEventForm from "../../Forms/NewEventForm";
import { formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";

class QuickEvent extends Component {
  handleClick = (valid, title, upload, color) => {
    if (valid) {
      this.props.handleClick(this.props.data, title, color, upload);
    }
  };

  render() {
    const { title, valid, upload, color } = this.props;

    return (
      <Aux>
        <Modal
          open={this.props.showModal}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.props.close}
          dimmer="blurring"
          size="small"
        >
          <Modal.Header style={{ textAlign: "center" }}>
            Adauga o programare rapida
          </Modal.Header>
          <Modal.Content>
            <NewEventForm quick />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.props.close} negative>
              Anuleaza
            </Button>
            <Button
              onClick={() => this.handleClick(valid, title, upload, color)}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Salveaza"
            />
          </Modal.Actions>
        </Modal>
      </Aux>
    );
  }
}

const selector = formValueSelector("newEvent-form");
QuickEvent = connect(state => {
  const { title, upload, color } = selector(state, "title", "upload", "color");
  return {
    title,
    upload,
    color
  };
})(QuickEvent);

QuickEvent = reduxForm({
  form: "newEvent-form"
})(QuickEvent);

export default QuickEvent;
