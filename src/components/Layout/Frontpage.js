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
                  <List.Item as={NavLink} to="/thread/11">
                    <Image
                      avatar
                      src="https://res.cloudinary.com/robertdg11/image/upload/c_fill,h_729,r_0,w_2000/v1561818652/video_games_thread/video_games_cover.jpg"
                    />
                    <List.Content>
                      <List.Header>Video Games</List.Header>
                      Created by roby_buble2010@yahoo.com
                    </List.Content>
                  </List.Item>
                  <List.Item as={NavLink} to="/thread/12">
                    <Image
                      avatar
                      src="https://res.cloudinary.com/robertdg11/image/upload/v1561842734/movies_thread/2400x780_Movie2014Banner.jpg"
                    />
                    <List.Content>
                      <List.Header>Movies</List.Header>Created by
                      roby_buble2010@yahoo.com
                    </List.Content>
                  </List.Item>
                  <List.Item as={NavLink} to="/thread/15">
                    <Image
                      avatar
                      src="https://res.cloudinary.com/robertdg11/image/upload/v1562044673/threads/maxresdefault_qxb5g3.jpg"
                    />
                    <List.Content>
                      <List.Header>Soccer</List.Header>
                      Created by roby_buble2010@yahoo.com
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
