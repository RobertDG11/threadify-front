import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

const ConnectedDeCe = props => (
  <Container textAlign="justified">
    <Header as="h2" icon textAlign="center">
      <Icon name="question" circular />
      <Header.Content>{props.literals.why.title}</Header.Content>
    </Header>
    <p style={{ lineHeight: "1.5em", fontSize: "1.33em" }}>
      {props.literals.why.content}
    </p>
  </Container>
);

const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

const DeCe = connect(mapStateToProps)(ConnectedDeCe);

export default DeCe;
