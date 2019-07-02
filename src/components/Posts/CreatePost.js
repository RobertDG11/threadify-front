import React, { Component, createRef } from "react";
import Aux from "../../hoc/aux";
import { resetPosts } from "../redux/reducers/postReducer";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import _ from "lodash";

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
  Search
} from "semantic-ui-react";

import NewPostForm from "../Forms/NewPostForm";
import { getThreads } from "../redux/reducers/threadReducer";
import WindowSize from "../../hoc/WindowSize";

const initialState = {
  isLoading: false,
  results: [],
  value: "",
  threads: []
};

const getVotes = votes => {
  if (votes > 999) {
    const number = Number(Math.round(votes / 1000 + "e" + 1) + "e-" + 1) + "K";
    return number;
  }

  return votes;
};

class ConnectedCreatePost extends Component {
  state = initialState;

  componentDidMount = async () => {
    const threads = await this.props.getThreads();

    console.log(threads);

    this.setState({
      threads: threads.data.map(thread => ({
        title: thread.name,
        image: thread.coverPhoto,
        description: `Members ${getVotes(thread.users)}`
      }))
    });
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      //if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.threads, isMatch)
      });
    }, 300);
  };
  componentWillMount() {}

  render() {
    const marginTop = this.props.windowWidth <= 991 ? "0px" : "56px";
    const { isLoading, value, results } = this.state;
    return (
      <Segment
        style={{
          minHeight: "100vh",
          margin: "0",
          marginTop: marginTop,
          backgroundColor: "lightgray"
        }}
      >
        <Grid stackable>
          <Grid.Row />
          <Grid.Column computer={3} tablet={2} />
          <Grid.Column computer={10} tablet={12} style={{ maxWidth: 1000 }}>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true
              })}
              results={results}
              value={value}
              style={{ marginBottom: "15px" }}
            />
            <Segment
              vertical
              raised
              style={{
                padding: 0,
                backgroundColor: "white"
              }}
            >
              <Header as="h2" style={{ paddingTop: "30px" }} textAlign="center">
                Create new post
              </Header>
              <NewPostForm type="front" />
            </Segment>
          </Grid.Column>
          <Grid.Column computer={3} tablet={2} />
        </Grid>
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
    modifyOpenModal: () => dispatch({ type: "CREATE_THREAD" }),
    getThreads: () => dispatch(getThreads())
  };
}

const CreatePost = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCreatePost);

export default WindowSize(CreatePost);
