import React, { Component } from "react";
import RightArrow from "./RightArrow";
import LeftArrow from "./LeftArrow";
import Indicator from "./Indicator";
import Content from "./Content";
import { GridRow, GridColumn, List, Icon } from "semantic-ui-react";
import WindowSize from "../../../../hoc/WindowSize";
import Aux from "../../../../hoc/aux";
import { scroller } from "react-scroll";
import { connect } from "react-redux";

import styles from "./Carousel.module.scss";

class ConnectedCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      classN: styles.Content0
    };

    this.myRef = React.createRef();
  }

  handleClick = () => {
    scroller.scrollTo("text", {
      duration: 500,
      smooth: true,
      offset: -100
    });
  };

  getClass = className => {
    if (className === "styles.Content0") return styles.Content0;
    else if (className === "styles.Content1") return styles.Content1;
    else if (className === "styles.Content2") return styles.Content2;

    return styles.Content1;
  };
  goToSlide = index => {
    this.setState({
      activeIndex: index,
      classN: this.getClass(`styles.Content${index}`)
    });
  };

  goToPrevSlide = e => {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    index--;

    this.setState({
      activeIndex: index,
      classN: this.getClass(`styles.Content${index}`)
    });
  };

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    index++;

    this.setState({
      activeIndex: index,
      classN: this.getClass(`styles.Content${index}`)
    });
  }
  render() {
    const btnSize = this.props.mobile ? "mini" : "huge";
    const arrowSize = this.props.mobile ? "small" : "big";
    const height =
      this.props.windowWidth > 768 ? this.props.windowHeight - 75 : null;
    const paddingHeader =
      this.props.windowWidth > 768 ? this.props.windowHeight - 250 : null;
    const { literals } = this.props;
    return (
      <Aux>
        <GridRow className={this.state.classN} style={{ height: height }} />
        <GridRow className={styles.PositionContent}>
          <Content
            btnSize={btnSize}
            text={literals.meet}
            style={{ paddingTop: paddingHeader }}
          />
          {this.props.mobile ? null : (
            <div onClick={this.handleClick}>
              <Icon
                name="angle double down"
                size="huge"
                className={styles.CenterArrowBounce}
              />
            </div>
          )}
        </GridRow>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

const Carousel = connect(mapStateToProps)(ConnectedCarousel);

export default WindowSize(Carousel);
