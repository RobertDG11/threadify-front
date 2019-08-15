import React, { Component, createRef } from "react";
import Aux from "../../hoc/aux";
import { resetPosts, getPost } from "../redux/reducers/postReducer";
import { getReplies, addReply } from "../redux/reducers/replyReducer";
import { NavLink } from "react-router-dom";
import {
  Segment,
  Header,
  Comment,
  List,
  Image,
  Button,
  Grid,
  Sticky,
  Form,
  Icon,
  Ref
} from "semantic-ui-react";

import WindowSize from "../../hoc/WindowSize";
import { connect } from "react-redux";
import Draggable from "react-draggable";
import Post from "../Posts/Post";
import {
  joinGroup,
  leaveGroup,
  updateGroup
} from "../redux/reducers/authReducer";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import TimeAgo from "react-timeago";
import english from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const formatter = buildFormatter(english);

const getVotes = votes => {
  if (votes > 999) {
    const number = Number(Math.round(votes / 1000 + "e" + 1) + "e-" + 1) + "K";
    return number;
  }

  return votes;
};

class ConnectedPostPage extends Component {
  contextRef = createRef();
  state = {
    loading: true,
    searchQuery: "",
    users: [],
    value: []
  };
  componentWillMount = async () => {
    console.log(this.props);
    const result = await this.props.getPost(
      this.props.location.pathname.slice(6, this.props.location.pathname.length)
    );

    this.setState({ loading: false });

    console.log(result);
  };

  componentDidMount = async () => {
    // const result = await this.props.getReplies(
    //   "1",
    //   10,
    //   this.props.location.pathname.slice(6, this.props.location.pathname.length)
    // );
    // console.log(result);
  };

  render() {
    const { isMobileSized } = this.props;
    const windowWidth = this.props.windowWidth;
    const marginTop = windowWidth <= 991 ? "0px" : "56px";
    return (
      <Segment
        loading={this.state.loading}
        style={{
          minHeight: "100vh",
          margin: "0",
          marginTop: marginTop,
          border: 0,
          padding: 0,
          backgroundColor: "lightgray"
        }}
      >
        {this.state.loading ? null : (
          <Ref innerRef={this.contextRef}>
            <Grid stackable>
              <Grid.Column width={3} />
              <Grid.Column width={10} style={{ maxWidth: 1000 }}>
                <Post
                  key={this.props.post.id}
                  id={this.props.post.id}
                  thread={this.props.post.threadName}
                  threadId={this.props.post.threadId}
                  owner={this.props.post.ownerUsername}
                  date={this.props.post.createdAt}
                  title={this.props.post.title}
                  tags={this.props.post.tags}
                  score={getVotes(this.props.post.score)}
                  media={this.props.post.media}
                  text={this.props.post.text}
                  comments={this.props.post.comments}
                  threadCover={this.props.post.threadCover}
                  votes={this.props.post.votes}
                  userId={this.props.auth.user.id}
                  type="post"
                />
                <Comment.Group
                  threaded
                  style={{
                    backgroundColor: "white",
                    padding: "30px",
                    margin: "0",
                    width: "100%",
                    maxWidth: "1000px"
                  }}
                >
                  <Header as="h3" dividing>
                    Comments
                  </Header>

                  {this.props.replies.map(reply => (
                    <Comment>
                      <Comment.Avatar as="a" src={reply.photo} />
                      <Comment.Content>
                        <Comment.Author as="a">
                          {reply.ownerUsername}
                        </Comment.Author>
                        <Comment.Metadata>
                          <TimeAgo
                            date={reply.createdAt}
                            formatter={formatter}
                          />
                        </Comment.Metadata>
                        <Comment.Text>{reply.text}</Comment.Text>
                        <Comment.Actions>
                          <a>Reply</a>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}

                  <Editor
                    apiKey="z7wifel0cg6x4z0cyqxre8pspd888fbw8xym4umkr1emgjqo"
                    init={{
                      height: 400,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor textcolor",
                        "searchreplace visualblocks code fullscreen emoticons",
                        "insertdatetime media table paste code help wordcount",
                        "formatpainter permanentpen table"
                      ],
                      toolbar:
                        "undo redo | formatselect | bold italic strikethrough forecolor backcolor permanentpen | link | table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons",
                      content_css: [
                        "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
                        "//www.tiny.cloud/css/codepen.min.css"
                      ]
                    }}
                    onChange={this.handleEditorChange}
                  />
                </Comment.Group>
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid>
          </Ref>
        )}
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    replies: state.replies.replies,
    auth: state.auth,
    post: state.posts.post
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getReplies: (page, size, id) => dispatch(getReplies(page, size, id)),
    addReply: id => dispatch(addReply(id)),
    getPost: id => dispatch(getPost(id))
  };
}

const PostPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedPostPage);

export default WindowSize(PostPage);
