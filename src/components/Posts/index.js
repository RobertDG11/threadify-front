import React from "react";
import { Switch, Route } from "react-router-dom";

import CreatePost from "./CreatePost";
//import Frontpage from "../Layout/Frontpage";
import AuthRoute from "../Routes/AuthRoute";
import PostPage from "./PostPage";

const PostsRoutes = ({ match }) => (
  <Switch>
    <AuthRoute exact path={`${match.url}/new`} component={CreatePost} />
    <AuthRoute exact path={`${match.url}/:id`} component={PostPage} />
  </Switch>
);

export default PostsRoutes;
