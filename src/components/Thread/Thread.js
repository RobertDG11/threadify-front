import React, { Component, createRef } from "react";
import Aux from "../../hoc/aux";
import { resetPosts } from "../redux/reducers/postReducer";
import {
  Segment,
  Header,
  List,
  Image,
  Button,
  Grid,
  Sticky,
  Icon,
  Ref,
  Container,
  ButtonContent,
  Dropdown
} from "semantic-ui-react";

import WindowSize from "../../hoc/WindowSize";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import Posts from "../Posts/Posts";
import { getThread } from "../redux/reducers/threadReducer";
import {
  joinGroup,
  leaveGroup,
  updateGroup
} from "../redux/reducers/authReducer";
import axios from "axios";

class ConnectedThread extends Component {
  contextRef = createRef();
  state = {
    loading: true,
    searchQuery: "",
    users: [],
    value: []
  };
  componentWillMount() {
    this.props.resetPosts();

    this.setState({
      threadId: parseInt(
        this.props.location.pathname.slice(
          8,
          this.props.location.pathname.length
        )
      )
    });
  }

  componentDidMount = async () => {
    await this.props.getThread(
      this.props.location.pathname.slice(8, this.props.location.pathname.length)
    );

    const users = await axios.get("/users");

    const options = users.data.map(user => ({
      key: user.id,
      text: user.login,
      value: user
    }));

    this.setState({ loading: false, users: options });
  };

  joinGroup = () => {
    if (!this.props.auth.isAuth) {
      this.props.history.push("/login");
    } else {
      this.props.joinGroup(this.props.auth.user.id, this.props.thread.id);
    }
  };

  leaveGroup = () => {
    this.props.leaveGroup(this.props.auth.user.id, this.props.thread.id);
  };

  updateGroup = () => {
    this.props.updateGroup(this.props.thread.id, this.state.value);
  };

  handleChange = (e, { searchQuery, value }) => {
    this.setState({ searchQuery, value });
  };

  handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery });

  render() {
    const { isMobileSized } = this.props;
    const windowWidth = this.props.windowWidth;
    const marginTop = windowWidth <= 991 ? "0px" : "56px";

    return (
      <Segment
        style={
          windowWidth >= 768
            ? {
                minHeight: "100vh",
                margin: "0",
                marginTop: marginTop,
                border: 0,
                backgroundColor: "lightgray"
              }
            : {
                minHeight: "100vh",
                margin: "0",
                marginTop: marginTop,
                border: 0,
                padding: 0,
                backgroundColor: "lightgray"
              }
        }
      >
        <Ref innerRef={this.contextRef}>
          <Grid stackable>
            {this.props.thread.coverPhoto ? (
              <Grid.Row
                style={{
                  width: "100wh",
                  maxHeight: "500px",
                  overflow: "hidden",
                  padding: 0
                }}
              >
                <Image
                  centered
                  src={this.props.thread.coverPhoto}
                  style={{ width: "100%", height: "100%" }}
                />
              </Grid.Row>
            ) : null}

            {isMobileSized ? (
              <Grid.Row
                style={{
                  width: "100wh",
                  maxHeight: "350px",
                  padding: 0,
                  overflow: "hidden",
                  backgroundColor: "white"
                }}
              >
                <List verticalAlign="middle" style={{ margin: 0 }}>
                  <List.Item
                    style={{
                      width: "100vw",
                      height: "50px",
                      textAlign: "center",
                      paddingTop: "10px"
                    }}
                  >
                    <Image avatar src={this.props.thread.coverPhoto} />
                    <List.Content>
                      <List.Header as="h3">
                        {this.props.thread.name}
                      </List.Header>
                    </List.Content>
                  </List.Item>
                </List>
                <Grid columns={2} divided textAlign="center">
                  <Grid.Column>
                    <Header
                      as="h5"
                      content={`${this.props.thread.users}`}
                      subheader="Users joined this community"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    {" "}
                    <Header
                      as="h5"
                      content={`${this.props.thread.noPosts}`}
                      subheader="Posts written since was created"
                    />
                  </Grid.Column>
                </Grid>
                <p
                  style={{
                    margin: "15px 0",
                    width: "100vw",
                    textAlign: "center"
                  }}
                >
                  {this.props.thread.description}
                </p>

                <Button.Group
                  color="blue"
                  style={{ padding: 8, width: "100%" }}
                  size="small"
                >
                  {this.props.auth.isAuth &&
                  this.props.auth.groups.find(
                    group => group.threadIdId === this.state.threadId
                  ) ? (
                    <Button
                      animated="fade"
                      style={{ marginRight: "20px", marginLeft: "15px" }}
                      onClick={this.leaveGroup}
                    >
                      <ButtonContent visible>Joined</ButtonContent>
                      <ButtonContent hidden>Leave group</ButtonContent>
                    </Button>
                  ) : (
                    <Button
                      style={{ marginRight: "20px", marginLeft: "15px" }}
                      onClick={this.joinGroup}
                    >
                      Join
                    </Button>
                  )}
                  <Button
                    disabled={
                      this.props.auth.isAuth
                        ? this.props.auth.groups.find(
                            group => group.threadIdId === this.state.threadId
                          )
                          ? false
                          : true
                        : false
                    }
                    style={{ marginRight: "15px" }}
                  >
                    Create post
                  </Button>
                </Button.Group>
                {this.props.thread &&
                this.props.thread.type === "PRIVATE" &&
                this.props.auth.isAuth &&
                this.props.auth.user.id === this.props.thread.ownerId ? (
                  <Aux>
                    <Dropdown
                      multiple
                      onChange={this.handleChange}
                      onSearchChange={this.handleSearchChange}
                      options={this.state.users}
                      placeholder="Select users"
                      search
                      searchQuery={this.state.searchQuery}
                      selection
                      value={this.state.value}
                      style={{ width: "70%", margin: "10px" }}
                    />
                    <Button onClick={this.updateGroup}>Add</Button>
                  </Aux>
                ) : null}
              </Grid.Row>
            ) : null}
            <Grid.Column width={3} />
            <Grid.Column width={8} style={{ maxWidth: 650 }}>
              <Posts
                type="thread"
                threadId={this.props.location.pathname.slice(
                  8,
                  this.props.location.pathname.length
                )}
              />
            </Grid.Column>
            {isMobileSized ? null : (
              <Sticky
                offset={70}
                as={Grid.Column}
                width={5}
                styleElement={{ maxWidth: "360px" }}
                context={this.contextRef}
              >
                <Segment raised style={{ padding: 0 }}>
                  <List verticalAlign="middle">
                    <List.Item
                      style={{ paddingTop: "15px", paddingLeft: "15px" }}
                    >
                      <Image
                        avatar
                        src={this.props.thread.coverPhoto}
                        style={{ width: "3em", height: "3em" }}
                      />
                      <List.Content>
                        <List.Header as="h2">
                          {this.props.thread.name}
                        </List.Header>
                      </List.Content>
                    </List.Item>
                  </List>
                  <Grid columns={2} divided textAlign="center">
                    <Grid.Column>
                      <Header
                        as="h3"
                        content={`${this.props.thread.users}`}
                        subheader="Users joined this community"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      {" "}
                      <Header
                        as="h3"
                        content={`${this.props.thread.noPosts}`}
                        subheader="Posts written since was created"
                      />
                    </Grid.Column>
                  </Grid>
                  <Container textAlign="center" style={{ margin: "15px 0" }}>
                    {this.props.thread.description}
                  </Container>

                  <Button.Group
                    vertical
                    color="blue"
                    style={{ padding: 8, width: "100%" }}
                  >
                    {this.props.auth.isAuth &&
                    this.props.auth.groups.find(
                      group => group.threadIdId === this.state.threadId
                    ) ? (
                      <Button
                        fluid
                        style={{ marginBottom: 6, textAllign: "center" }}
                        animated="fade"
                        onClick={this.leaveGroup}
                      >
                        <ButtonContent visible>Joined</ButtonContent>
                        <ButtonContent hidden>Leave group</ButtonContent>
                      </Button>
                    ) : (
                      <Button
                        fluid
                        style={{ marginBottom: 6, textAllign: "center" }}
                        onClick={this.joinGroup}
                      >
                        Join
                      </Button>
                    )}
                    <Button
                      disabled={
                        this.props.auth.isAuth
                          ? this.props.auth.groups.find(
                              group => group.threadIdId === this.state.threadId
                            )
                            ? false
                            : true
                          : false
                      }
                    >
                      Create post
                    </Button>
                  </Button.Group>
                  {this.props.thread &&
                  this.props.thread.type === "PRIVATE" &&
                  this.props.auth.isAuth &&
                  this.props.auth.user.id === this.props.thread.ownerId ? (
                    <Aux>
                      <Dropdown
                        multiple
                        onChange={this.handleChange}
                        onSearchChange={this.handleSearchChange}
                        options={this.state.users}
                        placeholder="Select users"
                        search
                        searchQuery={this.state.searchQuery}
                        selection
                        value={this.state.value}
                        style={{ width: "70%", margin: "10px" }}
                      />
                      <Button onClick={this.updateGroup}>Add</Button>
                    </Aux>
                  ) : null}
                </Segment>
              </Sticky>
            )}
          </Grid>
        </Ref>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    thread: state.threads.thread,
    auth: state.auth
  };
};

function mapDispatchToProps(dispatch) {
  return {
    resetPosts: () => dispatch(resetPosts({ type: "PAGE1_RESET_PAGE" })),
    getThread: id => dispatch(getThread(id)),
    joinGroup: (user, thread) => dispatch(joinGroup(user, thread)),
    leaveGroup: (user, thread) => dispatch(leaveGroup(user, thread)),
    updateGroup: (thread, users) => dispatch(updateGroup(thread, users))
  };
}

const Thread = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedThread);

export default WindowSize(Thread);
