import React, { Component } from "react";
import {
  Card,
  Image,
  Dimmer,
  Icon,
  Header,
  Segment,
  Grid,
  List,
  Label,
  Container,
  Button
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import Aux from "../../hoc/aux";
import WindowSize from "../../hoc/WindowSize";
import ReactPlayer from "react-player";
import TimeAgo from "react-timeago";
import english from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";

const formatter = buildFormatter(english);

const parseText = text => {
  return text.replace(
    /\[display\](.*?)\[link\](.*?)\[\\link\]\[\\display\]/gm,
    '<a href="$2">$1</a>'
  );
};

const voted = (votes, id) => {
  const vote = votes.find(vote => vote.votersId === id);
  return vote ? vote.type : null;
};

class Post extends Component {
  state = {
    score: this.props.score,
    votes: this.props.votes,
    userId: this.props.userId
  };
  componentWillMount() {
    const colorUp =
      voted(this.state.votes, this.state.userId) === true ? "green" : null;
    const colorDown =
      voted(this.state.votes, this.state.userId) === false ? "red" : null;

    this.setState({
      colorUp,
      colorDown
    });
  }
  voteUp = async () => {
    if (this.props.userId) {
      const { votes, userId } = this.state;
      const vote = votes.find(vote => vote.votersId === userId);

      if (this.state.colorUp === null) {
        if (this.state.colorDown === null) {
          await axios.post(`/vote-posts`, {
            type: true,
            votersId: userId,
            votedPostId: this.props.id
          });
          this.setState({
            colorUp: "green",
            score:
              this.state.score === -1
                ? this.state.score + 2
                : this.state.score + 1
          });
        } else {
          await axios.put(`/vote-posts`, {
            id: vote.id,
            type: true,
            votersId: userId,
            votedPostId: this.props.id
          });
          this.setState({
            colorUp: "green",
            colorDown: null,
            score:
              this.state.score === -1
                ? this.state.score + 2
                : this.state.score + 1
          });
        }
      }
    }
  };

  voteDown = async () => {
    if (this.props.userId) {
      const { votes, userId } = this.state;
      const vote = votes.find(vote => vote.votersId === userId);

      if (this.state.colorDown === null) {
        if (this.state.colorUp === null) {
          await axios.post(`/vote-posts`, {
            type: false,
            votersId: userId,
            votedPostId: this.props.id
          });
          this.setState({
            colorDown: "red",
            score:
              this.state.score === 1
                ? this.state.score - 2
                : this.state.score - 1
          });
        } else {
          await axios.put(`/vote-posts`, {
            id: vote.id,
            type: false,
            votersId: userId,
            votedPostId: this.props.id
          });
          this.setState({
            colorUp: null,
            colorDown: "red",
            score:
              this.state.score === 1
                ? this.state.score - 2
                : this.state.score - 1
          });
        }
      }
    }
  };

  render() {
    return (
      <Segment
        vertical
        raised
        style={{
          padding: 0,
          maxHeight: "650px",
          overflow: "hidden",
          marginBottom: "2em"
        }}
      >
        <Grid.Row
          stretched
          style={{
            position: "absolute",
            bottom: 0,
            zIndex: 100,
            width: "100%",
            background: "#e0e1e2"
          }}
        >
          <Button.Group style={{ display: "inline", marginLeft: "2em" }}>
            <Button icon style={{ marginLeft: 40 }}>
              <Icon name="comment" />
              {this.props.comments} comments
            </Button>
            <Button icon>
              <Icon name="flag" />
              report
            </Button>
          </Button.Group>
        </Grid.Row>

        <Grid celled style={{ margin: 0, backgroundColor: "white" }}>
          <Grid.Column width={1} style={{ padding: 0 }}>
            <Button.Group size="small" vertical style={{ width: "100%" }}>
              <Button
                icon="arrow up"
                color={this.state.colorUp}
                onClick={this.voteUp}
                style={{ padding: "10px 0" }}
              />
              <Button style={{ padding: "10px 0" }}>{this.state.score}</Button>
              <Button
                icon="arrow down"
                color={this.state.colorDown}
                onClick={this.voteDown}
                style={{ padding: "10px 0" }}
              />
            </Button.Group>
          </Grid.Column>
          <Grid.Column width={15}>
            <Grid.Row>
              <List>
                <List.Item>
                  <Image avatar src={this.props.threadCover} />
                  <List.Content>
                    <List.Header
                      as={NavLink}
                      to={`/thread/${this.props.threadId}`}
                    >
                      {this.props.thread}
                    </List.Header>
                    <List.Description>
                      Posted by{" "}
                      <a>
                        <b>{this.props.owner}</b>
                      </a>{" "}
                      <TimeAgo date={this.props.date} formatter={formatter} />
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Row>
            <Grid.Row style={{ marginTop: 6 }}>
              <Header size="medium">
                {this.props.title}{" "}
                <Label.Group style={{ display: "inline" }}>
                  {this.props.tags.map(tag => (
                    <Label color={tag.color} key={tag.id} as="a">
                      {tag.tag}
                    </Label>
                  ))}
                </Label.Group>
              </Header>
            </Grid.Row>
            <Grid.Row style={{ maxHeight: "650px", marginTop: 6 }}>
              {this.props.media === "none" ? null : this.props.media.slice(
                  0,
                  5
                ) === "video" ? (
                <ReactPlayer
                  width="100%"
                  url={this.props.media.slice(6, this.props.media.length)}
                  controls
                />
              ) : (
                <Image centered src={this.props.media} />
              )}
              <Container style={{ marginTop: 13, paddingBottom: 36 }}>
                <p>{ReactHtmlParser(parseText(this.props.text))}</p>
              </Container>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default Post;
