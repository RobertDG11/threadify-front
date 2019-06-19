import React, { Component } from "react";
import {
  Icon,
  Form,
  Input,
  Select,
  Button,
  Container,
  Segment,
  Header
} from "semantic-ui-react";
import { connect } from "react-redux";
import { addField, removeFields } from "../redux/actions/actions";
import Aux from "../../hoc/aux";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

class ConnectedForm extends Component {
  state = {
    show: false
  };

  handleNewField = () => {
    this.setState({ show: !this.state.show });
  };

  handleReset = () => {
    this.props.removeFields();
    this.setState({ show: this.state.show });
  };

  handleChangeInput = (e, { value }) => {
    this.setState({ text: value });
  };
  handleChangeSelect = (e, { value }) => {
    this.setState({ select: value });
  };

  handleChangeOptions = (e, { value }) => {
    const values = value.split(",");
    let options = [];
    values.forEach(element => {
      options.push({
        key: element.trim(),
        text: element.trim(),
        value: element.trim()
      });
    });
    this.setState({ options });
  };

  handleSave = () => {
    this.props.addField({
      fieldtype: this.state.select,
      label: this.state.text,
      placeholder: this.state.text,
      name: this.state.text,
      options: this.state.options
    });
    console.log(this.state.options);
    this.setState({ show: false });
  };

  handleSubmit = () => {
    toast.success("Multumim pentru rasspuns", {
      position: toast.POSITION.TOP_CENTER
    });
    this.props.history.push("/");
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
    const options = [
      {
        key: 1,
        text: "Text",
        value: "Input"
      },
      {
        key: 2,
        text: "Select",
        value: "Select"
      }
    ];
    return (
      <Container text textAlign="center">
        <Header content="Chestionarul zilei" />
        <Form>
          {this.props.fields.map(element => (
            <Form.Field
              key={`${element.cotrol}-${element.label}`}
              control={element.fieldtype === "Select" ? Select : Input}
              {...element}
            />
          ))}
          {this.props.fields.length > 0 ? (
            <Button style={{ marginTop: "2em" }} onClick={this.handleSubmit}>
              Trimite
            </Button>
          ) : null}
        </Form>

        {this.state.show ? (
          <Segment>
            <Form>
              <Form.Field
                control={Input}
                label="Numele campului"
                placeholder="Introdu un nume"
                onChange={this.handleChangeInput}
              />
              <Form.Field
                control={Select}
                label="Tipul campului"
                options={options}
                placeholder="Alege un tip"
                onChange={this.handleChangeSelect}
              />
              {this.state.select === "Select" ? (
                <Form.Field
                  control={Input}
                  label="Scrie optiunile(delimitate prin virgula)"
                  placeholder="Introdu optiunile"
                  onChange={this.handleChangeOptions}
                />
              ) : null}
            </Form>
            <Button
              onClick={this.handleSave}
              style={{ marginTop: "2em" }}
              primary
            >
              Salveaza
            </Button>
          </Segment>
        ) : null}
        {this.hasPermission(0) ? (
          <Aux>
            <Button
              style={{ marginTop: "2em" }}
              onClick={this.handleNewField}
              icon
              labelPosition="right"
            >
              Camp nou
              <Icon name="plus" />
            </Button>
            <Button style={{ marginTop: "2em" }} onClick={this.handleReset}>
              Reseteaza
            </Button>
          </Aux>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    userType: state.auth.user.user_type,
    fields: state.formCustom.fields
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addField: field => dispatch(addField(field)),
    removeFields: () => dispatch(removeFields())
  };
}

const FormCustom = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedForm);

export default withRouter(FormCustom);
