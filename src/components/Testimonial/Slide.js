import React from "react";
import { Segment, Image, Header, Icon } from "semantic-ui-react";
import styles from "./Testimonial.module.scss";

const slide = props => {
  return (
    <Segment vertical>
      <Image src={props.image} size="medium" circular centered />
      <Header
        as="h3"
        content={props.name}
        sub
        textAlign="center"
        className={styles.Name}
      />

      <span className={styles.Span}>
        <Icon name="quote left" size="big" className={styles.IconLeft} />
        <p className={styles.Description}>{props.description}</p>
        <Icon name="quote right" size="big" className={styles.IconRight} />
      </span>
    </Segment>
  );
};

export default slide;
