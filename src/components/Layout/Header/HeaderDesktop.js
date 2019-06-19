import React, { Component } from "react";
import DesktopMenu from "./Menu/Desktop/DesktopMenu";
import DesktopMenuDiff from "./Menu/Desktop/DesktopMenuDiff";
import { Segment, Visibility, Icon } from "semantic-ui-react";
import Carousel from "./Carousel/Carousel";
import WindowSize from "../../../hoc/WindowSize";
import Aux from "../../../hoc/aux";
import { scroller } from "react-scroll";

import styles from "./Header.module.scss";
import { classBody } from "@babel/types";

class HeaderDesktop extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  handleClick = () => {
    scroller.scrollTo("text", {
      duration: 500,
      smooth: true,
      offset: -100
    });
  };

  render() {
    const { fixed } = this.state;
    const height = this.props.showCarousel ? this.props.windowHeight : null;
    const className = this.props.showCarousel
      ? `${styles.SegmentProp} ${styles.Header}`
      : styles.SegmentProp;

    return (
      <Visibility
        once={false}
        onOffScreen={this.showFixedMenu}
        onOnScreen={this.hideFixedMenu}
      >
        <Segment
          style={{ height: height }}
          inverted
          color="blue"
          textAlign="center"
          className={className}
          vertical
        >
          {this.props.showCarousel ? (
            <Aux>
              <DesktopMenu fixed={fixed} />

              <div onClick={this.handleClick} className={styles.ArrowPosition}>
                <Icon
                  name="angle double down"
                  size="huge"
                  className={styles.CenterArrowBounce}
                />
              </div>
            </Aux>
          ) : (
            <DesktopMenuDiff />
          )}
        </Segment>
      </Visibility>
    );
  }
}

export default WindowSize(HeaderDesktop);
