import React from "react";
import { Container, Header, Grid, Icon, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import Aux from "../../hoc/aux";

import image from "../../images/school.png";

const ConnectedFeatures = props => (
  <Aux>
    <Container textAlign="center" style={{ marginBottom: "6em" }}>
      <Header style={{ fontSize: "2.3em" }} as="h1">
        Explore these amazing features
      </Header>
      <Header.Subheader style={{ fontSize: "1.7em" }}>
        And much more to discover
      </Header.Subheader>
    </Container>

    <Grid columns="equal" stackable container>
      <Grid.Column>
        <Container textAlign="justified">
          <Header as="h2" icon textAlign="center">
            <Icon name="facebook official" color="blue" />
            <Header.Subheader style={{ fontSize: "1em" }}>
              Social login
            </Header.Subheader>
          </Header>
          <p style={{ fontSize: "1.2em" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </Container>
      </Grid.Column>
      <Grid.Column>
        <Container textAlign="justified">
          <Header as="h2" icon textAlign="center">
            <Icon name="upload" color="blue" />
            <Header.Subheader style={{ fontSize: "1em" }}>
              Share your thoughts
            </Header.Subheader>
          </Header>
          <p style={{ fontSize: "1.2em" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </Container>
      </Grid.Column>
      <Grid.Column>
        <Container textAlign="justified">
          <Header as="h2" icon textAlign="center">
            <Icon name="globe" color="blue" />
            <Header.Subheader style={{ fontSize: "1em" }}>
              Connect with people
            </Header.Subheader>
          </Header>
          <p style={{ fontSize: "1.2em" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </Container>
      </Grid.Column>
      <Grid.Column>
        <Container textAlign="justified">
          <Header as="h2" icon textAlign="center">
            <Icon name="user secret" color="blue" />
            <Header.Subheader style={{ fontSize: "1em" }}>
              Create private threads
            </Header.Subheader>
          </Header>
          <p style={{ fontSize: "1.2em" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </Container>
      </Grid.Column>
    </Grid>
  </Aux>
);

const mapStateToProps = state => {
  return {
    literals: state.literals
  };
};

const Features = connect(mapStateToProps)(ConnectedFeatures);

export default Features;
