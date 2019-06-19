import React from "react";
import DeviceMenu from "../Header/Menu/Device/DeviceMenu";
import { Segment } from "semantic-ui-react";
import Carousel from "./Carousel/Carousel";

import styles from "./Header.module.scss";

const HeaderDevice = props => {
  return (
    <Segment
      inverted
      textAlign="center"
      className={styles.SegmentProp}
      color="blue"
      vertical
    >
      <DeviceMenu handleToggle={props.handleToggle} />
      {props.showCarousel ? <Carousel mobile slides={[1, 2, 3]} /> : null}
    </Segment>
  );
};

export default HeaderDevice;
