import React, { Component } from "react";
import { Button, Modal, Popup, Icon, Message } from "semantic-ui-react";
import Aux from "../../../hoc/aux";
import NewEventForm from "../../Forms/NewEventForm";
import { formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";

class NewEvent extends Component {
  state = {
    open: false,
    options: [],
    showError: false
  };

  componentWillMount() {
    let options = [];
    this.props.rooms.forEach(element => {
      options.push({
        key: element.id,
        text: element.name,
        value: element.id
      });
    });
    this.setState({ options });
  }

  close = () => this.setState({ open: false });

  open = () => this.setState({ open: true });

  handleClick = async (valid, classroom, start, end, title, color, upload) => {
    if (valid) {
      const error = await this.props.handleClick(
        this.props.data,
        classroom,
        start,
        end,
        title,
        color,
        upload
      );
      if (error) {
        this.setState({ showError: error });
      } else {
        this.setState({ open: false });
      }
    }
  };

  render() {
    const { open } = this.state;
    const { title, start, end, classroom, upload, valid, color } = this.props;

    const newEnd = end ? end.replace("T", " ") : undefined;
    const newStart = start ? start.replace("T", " ") : undefined;

    {
      if (this.state.showError)
        setTimeout(() => {
          this.setState({ showError: false });
        }, 8000);
    }

    return (
      <Aux>
        <Popup
          trigger={
            <Button circular icon onClick={this.open}>
              <Icon size="big" name="add" />
            </Button>
          }
          content="Adauga o noua programare"
        />

        <Modal
          open={open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.close}
          dimmer="blurring"
          size="small"
        >
          <Modal.Header style={{ textAlign: "center" }}>
            Adauga o noua programare
          </Modal.Header>
          <Modal.Content>
            {this.state.showError ? (
              <Message negative>
                <Message.Header>Eroare!</Message.Header>
                <Message.Content>
                  Sala pe care ai ales-o este deja rezervata in acest interval
                  de timp. Schimba sala sau alege alt interval!
                </Message.Content>
              </Message>
            ) : null}
            <NewEventForm options={this.state.options} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Anuleaza
            </Button>
            <Button
              onClick={() =>
                this.handleClick(
                  valid,
                  classroom,
                  newStart,
                  newEnd,
                  title,
                  color,
                  upload
                )
              }
              positive
              labelPosition="right"
              icon="checkmark"
              content="Salveaza"
              disabled={!valid}
            />
          </Modal.Actions>
        </Modal>
      </Aux>
    );
  }
}

const selector = formValueSelector("newEvent-form");

const mapStateToProps = state => {
  return {
    rooms: state.scheduler.rooms
  };
};

NewEvent = connect(state => {
  const { title, start, end, classroom, upload, color } = selector(
    state,
    "title",
    "start",
    "end",
    "classroom",
    "upload",
    "color"
  );
  return {
    title,
    start,
    end,
    classroom,
    upload,
    color
  };
})(NewEvent);

NewEvent = connect(mapStateToProps)(NewEvent);

NewEvent = reduxForm({
  form: "newEvent-form"
})(NewEvent);

export default NewEvent;
