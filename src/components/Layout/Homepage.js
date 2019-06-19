import React from "react";
import Aux from "../../hoc/aux";
import Features from "../TextComponents/Features";
import Steps from "../TextComponents/Steps";
import DeCe from "../TextComponents/DeCe";
import { Divider } from "semantic-ui-react";
import { Element } from "react-scroll";

import styles from "../TextComponents/Text.module.scss";

const Homepage = () => {
  return (
    <Element name="text">
      <Features />
      <Divider className={styles.AddMargin} />
      <Steps />
    </Element>
  );
};

export default Homepage;
