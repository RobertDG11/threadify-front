import React from "react";
import Aux from "../../../../hoc/aux";
import { Button, Header, Icon, GridColumn } from "semantic-ui-react";
import { scroller } from "react-scroll";
import { connect } from "react-redux";

import styles from "./Carousel.module.scss";

const ConnectedContent = props => {
  const handleClick = () => {
    scroller.scrollTo("location", {
      duration: 500,
      smooth: true,
      offset: -100
    });
  };
  return (
    <Aux>
      <GridColumn className={styles.TextHeader} style={props.style}>
        <Header
          as="h1"
          content={props.text}
          inverted
          textAlign="center"
          className={styles.TextSize}
        />
      </GridColumn>
      <Button
        onClick={handleClick}
        primary
        size={props.btnSize}
        className={styles.Btn}
      >
        {props.literals.location} <Icon name="right arrow" />
      </Button>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

const Content = connect(mapStateToProps)(ConnectedContent);

export default Content;
