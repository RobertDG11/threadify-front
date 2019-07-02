import React from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import "../../App.scss";
import ResponsiveContainer from "./Container/ResponsiveContainer";
import { withRouter } from "react-router-dom";

const ConnectedLayout = props => (
  <ResponsiveContainer showCarousel={props.showCarousel}>
    {props.children}
  </ResponsiveContainer>
);

const mapStateToProps = state => {
  return {
    showCarousel: state.showCarousel.showCarousel
  };
};

const Layout = connect(mapStateToProps)(ConnectedLayout);

export default withRouter(Layout);
