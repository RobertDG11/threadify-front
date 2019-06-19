import React from "react";
import Aux from "../../hoc/aux";
import Features from "../TextComponents/Features";
import Steps from "../TextComponents/Steps";
import { Divider } from "semantic-ui-react";

import styles from "../TextComponents/Text.module.scss";

const Frontpage = () => {
  return (
    <Aux name="text">
      <Features />
      <Divider className={styles.AddMargin} />
      <Steps />
    </Aux>
  );
};

export default Frontpage;
