import React from "react";
import Aux from "../../hoc/aux";
import Features from "../TextComponents/Features";
import Steps from "../TextComponents/Steps";
import DeCe from "../TextComponents/DeCe";
import { Divider, Segment } from "semantic-ui-react";
import { Element } from "react-scroll";

import styles from "../TextComponents/Text.module.scss";

const Homepage = () => {
  return (
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Element name="text">
        <Features />
        <Divider className={styles.AddMargin} />
        <Steps />
      </Element>
    </Segment>
  );
};

export default Homepage;
