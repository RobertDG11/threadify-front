import React from "react";
import { Icon, GridColumn } from "semantic-ui-react";

import styles from "./Carousel.module.scss";

const LeftArrow = props => (
  <GridColumn className={styles.LeftArrow} onClick={props.customClick}>
    <Icon
      name="angle left"
      className={styles.VerticalCentered}
      size={props.arrowSize}
    />
  </GridColumn>
);

export default LeftArrow;
