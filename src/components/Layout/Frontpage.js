import React, { Component, createRef } from "react";
import Aux from "../../hoc/aux";
import { resetPosts } from "../redux/reducers/postReducer";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Segment,
  Header,
  List,
  Image,
  Button,
  Grid,
  Sticky,
  Icon,
  Ref
} from "semantic-ui-react";

import Posts from "../Posts/Posts";
import Thread from "../Thread/CreateThread";
import WindowSize from "../../hoc/WindowSize";

const getVotes = votes => {
  if (votes > 999) {
    const number = Number(Math.round(votes / 1000 + "e" + 1) + "e-" + 1) + "K";
    return number;
  }

  return votes;
};

class ConnectedFrontpage extends Component {
  contextRef = createRef();
  componentWillMount() {
    this.props.resetPosts();
  }
  openModalHandler = () => {
    this.props.modifyOpenModal();
  };
  render() {
    const marginTop = this.props.windowWidth <= 991 ? "0px" : "56px";
    return (
      <Segment
        style={{
          minHeight: "100vh",
          margin: "0",
          marginTop: marginTop,
          backgroundColor: "lightgray"
        }}
      >
        <Thread />
        <Ref innerRef={this.contextRef}>
          <Grid stackable>
            <Grid.Column computer={3} tablet={1} />
            <Grid.Column computer={8} tablet={10} style={{ maxWidth: 650 }}>
              <Posts type="front" />
            </Grid.Column>
            <Sticky
              offset={70}
              as={Grid.Column}
              computer={5}
              tablet={5}
              styleElement={{ maxWidth: "360px" }}
              context={this.contextRef}
            >
              <Segment raised style={{ padding: 0 }}>
                <Header as="h2" style={{ paddingTop: "15px" }}>
                  <Icon name="hotjar" />
                  <Header.Content>Most popular threads</Header.Content>
                </Header>
                <List celled>
                  <List.Item>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
                    />
                    <List.Content>
                      <List.Header>Snickerdoodle</List.Header>
                      An excellent companion
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
                    />
                    <List.Content>
                      <List.Header>Poodle</List.Header>A poodle, it's pretty
                      basic
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Image
                      avatar
                      src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
                    />
                    <List.Content>
                      <List.Header>Paulo</List.Header>
                      He's also a dog
                    </List.Content>
                  </List.Item>
                </List>
                <Button.Group
                  vertical
                  color="blue"
                  style={{ padding: 8, width: "100%" }}
                >
                  <Button
                    fluid
                    style={{ marginBottom: 6, textAllign: "center" }}
                    as={NavLink}
                    exact
                    to="/post/new"
                  >
                    Create post
                  </Button>
                  <Button
                    onClick={this.openModalHandler}
                    as={NavLink}
                    exact
                    to="/thread/new"
                  >
                    Create thread
                  </Button>
                </Button.Group>
              </Segment>
            </Sticky>
          </Grid>
        </Ref>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    threads: state.threads
  };
};

function mapDispatchToProps(dispatch) {
  return {
    resetPosts: () => {
      dispatch(resetPosts({ type: "PAGE1_RESET_PAGE" }));
    },
    modifyOpenModal: () => dispatch({ type: "CREATE_THREAD" })
  };
}

const Frontpage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedFrontpage);

export default WindowSize(Frontpage);
