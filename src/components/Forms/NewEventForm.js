import React from "react";
import { Icon, Form, Input, Button } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import { Required, ValidStartTime, ValidEndTime } from "./Validation";
import Aux from "../../hoc/aux";

const UploadFile = ({
  input: { value: omitValue, ...inputProps },
  meta: omitMeta,
  as: As = Form.Input,
  ...props
}) => (
  <Form.Field
    style={{
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto"
    }}
  >
    <As {...inputProps} {...props} />
  </Form.Field>
);

const ColorPicker = ({
  input: { value: omitValue, ...inputProps },
  meta: omitMeta,
  as: As = "input",
  ...props
}) => (
  <Form.Field style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}>
    <label>Culoare</label>
    <As {...inputProps} {...props} />
  </Form.Field>
);

const FormField = ({
  input,
  meta: { touched, error },
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
    <Form.Field
      style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
    >
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

const NewEventForm = props => {
  return (
    <Form>
      <Field
        component={FormField}
        name="title"
        placeholder="Introdu un titlu..."
        required
        icon="user"
        iconPosition="left"
        label="Titlu"
        validate={[Required]}
      />
      {!props.quick ? (
        <Aux>
          <Field
            component={FormField}
            name="start"
            required
            icon="calendar alternate outline"
            iconPosition="left"
            label="Data si ora de inceput"
            validate={[Required, ValidStartTime]}
            control={Input}
            type="datetime-local"
          />
          <Field
            component={FormField}
            name="end"
            required
            icon="calendar alternate outline"
            iconPosition="left"
            label="Data si ora de sfarsit"
            validate={[Required, ValidEndTime]}
            control={Input}
            type="datetime-local"
          />

          <Field
            name="classroom"
            component={FormField}
            required
            label="Alege sala"
            validate={[Required]}
            control={Form.Select}
            options={props.options}
          />
        </Aux>
      ) : null}

      <Field
        name="color"
        component={ColorPicker}
        control="input"
        type="color"
        defaultValue="#ff0000"
      />
    </Form>
  );
};

const formConfiguration = {
  form: "newEvent-form"
};

export default reduxForm(formConfiguration)(NewEventForm);
