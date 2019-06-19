import React from "react";
import { Grid, Header, Container, Icon, Image, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { carouselVisible, modifyActiveItem } from "../redux/actions/actions";
import Aux from "../../hoc/aux";

import iphone from "../../images/iphone.png";
import appIos from "../../images/download-app.svg";
import appAndroid from "../../images/download-app-android.png";
import "../../App.scss";

const ConnectedSteps = props => (
  <Aux>
    <Container textAlign="center" style={{ marginBottom: "6em" }}>
      <Header style={{ fontSize: "2.3em" }} as="h1">
        How it works - As simple as 1, 2, 3
      </Header>
      <Header.Subheader style={{ fontSize: "1.7em" }}>
        Very easy to use
      </Header.Subheader>
    </Container>

    <Grid columns="equal" stackable container>
      <Grid.Column>
        <Image className="SlideTop" src={iphone} size="large" />
      </Grid.Column>
      <Grid.Column textAlign="center">
        <List>
          <List.Item className="WorksStep">
            <div>1</div>
            <p style={{ fontSize: "1.5em", padding: "1em" }}>
              Join us today by creating a free account.
            </p>
          </List.Item>
          <List.Item className="WorksStep">
            <div>2</div>
            <p style={{ fontSize: "1.5em", padding: "1em" }}>
              Browse our community and find threads that suit your needs or
              create a new one.
            </p>
          </List.Item>
          <List.Item className="WorksStep">
            <div>3</div>
            <p style={{ fontSize: "1.5em", padding: "1em" }}>
              You're done! Now make freinds and earn reputation!
            </p>
          </List.Item>
        </List>
        <Grid.Row>
          <Header as="h3">Soon available on iOS and Android</Header>
          <Image.Group size="small">
            <Image as="a" href="#" src={appIos} />
            <Image as="a" href="#" src={appAndroid} />
          </Image.Group>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  </Aux>
);

const mapStateToProps = state => {
  return {
    showCarousel: state.showCarousel.showCarousel,
    activeItem: state.showCarousel.activeItem,
    literals: state.literals
  };
};

function mapDispatchToProps(dispatch) {
  return {
    carouselVisible: showCarousel => dispatch(carouselVisible(showCarousel)),
    modifyActiveItem: activeItem => dispatch(modifyActiveItem(activeItem))
  };
}

const Steps = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSteps);

export default Steps;
