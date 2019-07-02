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
import Uploader from "../CloudinaryUploader";
import { addThread } from "../redux/reducers/threadReducer";

const options = [
  {
    key: 1,
    text: "Public",
    value: "PUBLIC"
  },
  {
    key: 2,
    text: "Private",
    value: "PRIVATE"
  }
];

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
      const { name, description, type, coverPhoto } = data;

      const thread = {
        name,
        description,
        type,
        coverPhoto: coverPhoto
          ? coverPhoto
          : "https://res.cloudinary.com/robertdg11/image/upload/v1562046764/threads/default-bg.jpg.imgix_.banner.jpg.png",
        ownerId: props.user.id
      };

      const result = await props.addThread(thread);

      props.modifyOpenModal();
      props.history.push(`/thread/${result.data.id}`);
    }
  };
  return (
    <Aux>
      <Form>
        <Field
          component={FormField}
          name="name"
          required
          icon="clipboard list"
          iconPosition="left"
          label="Name"
          labelPosition="right corner"
          placeholder="Name"
          type="text"
          validate={[Required]}
        />
        <Field
          component={FormField}
          name="description"
          required
          icon="book"
          iconPosition="left"
          label="Description"
          placeholder="Description"
          type="text"
          validate={[Required]}
        />

        <Field
          name="type"
          component={FormField}
          required
          label="Thread type"
          validate={[Required]}
          control={Form.Select}
          options={options}
        />

        <Uploader field="coverPhoto" />

        <Button
          style={{ marginTop: "20px" }}
          onClick={props.handleSubmit(submitHandle)}
          attached="bottom"
        >
          <Button.Content>Create thread</Button.Content>
        </Button>
      </Form>
    </Aux>
  );
};

const formConfiguration = {
  form: "thread-form"
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
    addThread: thread => dispatch(addThread(thread)),
    modifyOpenModal: () => dispatch({ type: "CREATE_THREAD" })
  };
}

const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedLoginForm);

export default withRouter(reduxForm(formConfiguration)(LoginForm));
