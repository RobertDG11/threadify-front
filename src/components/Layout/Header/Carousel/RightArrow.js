import React from "react";
import { Icon, GridColumn } from "semantic-ui-react";

import styles from "./Carousel.module.scss";

const RightArrow = props => (
  <GridColumn className={styles.RightArrow} onClick={props.customClick}>
    <Icon
      name="angle right"
      className={styles.VerticalCentered}
      size={props.arrowSize}
    />
  </GridColumn>
);

export default RightArrow;
