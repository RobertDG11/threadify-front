import zxcvbn from "zxcvbn";

export const Required = value => (value ? undefined : "This is required field");

export const Email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const PasswordStrength = value =>
  value && zxcvbn(value).score > 2
    ? undefined
    : "Password should be at least good";

export const Confirm = values => {
  const errors = {};
  errors["password_confirmation"] =
    values["password"] === values["password_confirmation"]
      ? undefined
      : "Passwords are not the same";
  return errors;
};

export const ValidStartTime = value => {
  const tokens = value.split("T");
  const time = tokens[1].split(":");

  return parseInt(time[0]) > 7 && parseInt(time[0]) < 22
    ? undefined
    : "Intervalul disponibil este 08:00 - 22:00";
};

export const ValidEndTime = value => {
  const tokens = value.split("T");
  const time = tokens[1].split(":");

  return parseInt(time[0]) > 8 && parseInt(time[0]) < 23
    ? undefined
    : "Intervalul disponibil este 08:00 - 22:00";
};
