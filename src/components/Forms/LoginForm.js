import React from "react";
import {
  Button,
  Icon,
  Form,
  Segment,
  Header,
  Message
} from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { modifyLoginForm } from "../redux/actions/actions";
import { login } from "../redux/reducers/authReducer";
import { Required, Email } from "./Validation";
import Aux from "../../hoc/aux";

const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";
const API_BASE_URL = "http://localhost:8080";

const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;

const FormField = ({
  input,
  meta: { touched, error, visited, active },
  as: As = Form.Input,
  ...props
}) => {
  function handleChange(e, { value }) {
    return input.onChange(value);
  }

  const showError = () => {
    if (touched && error) {
      return true;
    }
    return false;
  };

  return (
    <Form.Field>
      <As
        {...input}
        value={input.value}
        {...props}
        onChange={handleChange}
        error={showError()}
      />

      {showError() ? (
        <span style={{ color: "red" }}>
          <Icon name="times circle outline" />
          {touched && error}
        </span>
      ) : null}
    </Form.Field>
  );
};

const ConnectedLoginForm = props => {
  const { valid } = props;
  const submitHandle = async data => {
    if (valid) {
      const response = await props.authenticate(data.username, data.password);
      if (response)
        setTimeout(() => {
          props.history.push("/");
          props.modifyLoginForm({
            open: false,
            register: props.loginModal.register
          });
        }, 5000);
    }
  };
  return (
    <Aux>
      <Form>
        <Field
          component={FormField}
          name="username"
          required
          icon="user"
          iconPosition="left"
          label="Username"
          labelPosition="right corner"
          placeholder="Username"
          type="text"
          validate={[Required]}
        />
        <Field
          component={FormField}
          name="password"
          required
          icon="lock"
          iconPosition="left"
          label="Parola"
          placeholder="Password"
          type="password"
          validate={[Required]}
        />

        <Button
          onClick={props.handleSubmit(submitHandle)}
          animated
          attached="bottom"
        >
          <Button.Content visible>Login</Button.Content>
          <Button.Content hidden>
            <Icon name="sign-in" />
          </Button.Content>
        </Button>
        <Button
          color="facebook"
          attached="bottom"
          style={{ marginTop: "8px" }}
          animated
          as="a"
          href={FACEBOOK_AUTH_URL}
        >
          <Button.Content visible>
            <Icon name="facebook" /> Login with Facebook
          </Button.Content>
          <Button.Content hidden>
            <Icon name="sign-in" />
          </Button.Content>
        </Button>
        <Button
          color="google plus"
          attached="top"
          style={{ marginTop: "8px" }}
          animated
          as="a"
          href={GOOGLE_AUTH_URL}
        >
          <Button.Content visible>
            <Icon name="google" /> Login with Google
          </Button.Content>

          <Button.Content hidden>
            <Icon name="sign-in" />
          </Button.Content>
        </Button>

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
      </Form>
      {props.successMessage ? (
        <Message success>
          <Message.Content>{props.successMessage}</Message.Content>
        </Message>
      ) : props.errorMessage ? (
        <Message error>
          <Message.Content>{props.errorMessage}</Message.Content>
        </Message>
      ) : null}
    </Aux>
  );
};

const formConfiguration = {
  form: "login-form"
};

const mapStateToProps = state => {
  return {
    loginModal: state.showCarousel.loginModal,
    successMessage: state.auth.successMessage,
    errorMessage: state.auth.errorMessage
  };
};

function mapDispatchToProps(dispatch) {
  return {
    modifyLoginForm: loginModal => dispatch(modifyLoginForm(loginModal)),
    authenticate: (username, password) => dispatch(login(username, password))
  };
}

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedLoginForm);

export default withRouter(reduxForm(formConfiguration)(LoginForm));
