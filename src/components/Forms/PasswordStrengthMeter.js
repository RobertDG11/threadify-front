import React from "react";
import zxcvbn from "zxcvbn";
import { Progress } from "semantic-ui-react";

const createPasswordLabel = result => {
  switch (result.score) {
    case 0:
      return "Slaba";
    case 1:
      return "Slaba";
    case 2:
      return "Acceptabila";
    case 3:
      return "Buna";
    case 4:
      return "Puternica";
    default:
      return "Slaba";
  }
};

const PasswordStrengthMeter = props => {
  const { password } = props;
  const testedResult = zxcvbn(password);
  return (
    <Progress
      total={4}
      value={testedResult.score}
      indicating
      style={{ marginBottom: "3em" }}
    >
      Password status: &nbsp;
      {createPasswordLabel(testedResult)}
    </Progress>
  );
};

export default PasswordStrengthMeter;
