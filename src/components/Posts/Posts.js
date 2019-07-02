import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import Post from "./Post";
import { connect } from "react-redux";
import { getPosts, resetPosts } from "../redux/reducers/postReducer";
import BottomScrollListener from "react-bottom-scroll-listener";
import Aux from "../../hoc/aux";

const getVotes = votes => {
  if (votes > 999) {
    const number = Number(Math.round(votes / 1000 + "e" + 1) + "e-" + 1) + "K";
    return number;
  }

  return votes;
};

class ConnectedPosts extends Component {
  state = {
    items: 0,
    posts: []
  };

  componentWillMount() {}

  componentDidMount = async () => {
    if (this.props.posts.length === 0) {
      const result = await this.props.getPosts(
        this.props.currentPage.toString(),
        10,
        "createdAt,desc",
        this.props.type,
        this.props.threadId
      );
      this.setState({
        items: this.state.items + result.data.length,
        posts: true
      });
    }
  };

  getNewPosts = async () => {
    const result = await this.props.getPosts(
      this.props.currentPage.toString(),
      10,
      "createdAt,desc",
      this.props.type,
      this.props.threadId
    );
    this.setState({
      items: this.state.items + result.data.length,
      posts: true
    });
  };

  refresh = () => {
    this.setState({ refresh: true });
  };

  render() {
    const { posts } = this.props;
    return (
      <Aux>
        {this.state.items < this.props.totalItems && this.state.items > 10 ? (
          <BottomScrollListener onBottom={this.getNewEvents} />
        ) : null}
        {posts.map(post => {
          return (
            <Post
              key={post.id}
              id={post.id}
              thread={post.threadName}
              threadId={post.threadId}
              owner={post.ownerUsername}
              date={post.createdAt}
              title={post.title}
              tags={post.tags}
              score={getVotes(post.score)}
              media={post.media}
              text={post.text}
              comments={post.comments}
              threadCover={post.threadCover}
              votes={post.votes}
              userId={this.props.user.id}
              function={this.refresh}
            />
          );
        })}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    currentPage: state.posts.currentPage,
    totalItems: state.posts.totalItems,
    user: state.auth.user
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (page, size, sort, type, id) =>
      dispatch(getPosts(page, size, sort, type, id)),
    resetPosts: () => {
      dispatch(resetPosts({ type: "PAGE1_RESET_PAGE" }));
    }
  };
}

const Posts = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedPosts);

export default Posts;
