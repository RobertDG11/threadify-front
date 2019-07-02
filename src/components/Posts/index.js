import React from "react";
import { Switch, Route } from "react-router-dom";

import CreatePost from "./CreatePost";
//import Frontpage from "../Layout/Frontpage";
import AuthRoute from "../Routes/AuthRoute";

const PostsRoutes = ({ match }) => (
  <Switch>
    <AuthRoute exact path={`${match.url}/new`} component={CreatePost} />
    {/* <Route exact path={`${match.url}/:id`} component={Thread} /> */}
  </Switch>
);

export default PostsRoutes;
