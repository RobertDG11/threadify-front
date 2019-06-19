import React from "react";
import { ListItem } from "semantic-ui-react";

import styles from "./Carousel.module.scss";

const Indicator = props => {
  const classN = props.isActive
    ? `${styles.Indicator} ${styles.Indicatoractive}`
    : styles.Indicator;
  return <ListItem className={classN} onClick={props.handleClick} />;
};

export default Indicator;
